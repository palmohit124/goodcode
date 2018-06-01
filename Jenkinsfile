#!/usr/bin/env groovy

pipeline {
    agent any

    tools {
      nodejs    'NodeJS 8.9.4'
    }

    environment {
      CHROME_BIN = '/usr/bin/chromium-browser'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class                           : 'GitSCM',
                          branches                         : [[name: '*/master']],
                          browser                          : [$class: 'GithubWeb', repoUrl: 'https://github.marchex.com/marchex/omni-marchex-io'],
                          doGenerateSubmoduleConfigurations: false,
                          extensions                       : [[$class: 'CloneOption', depth: 0, noTags: true, reference: '', shallow: false],
                                                              [$class: 'LocalBranch', localBranch: 'master'],
                                                              [$class: 'WipeWorkspace']],
                          submoduleCfg                     : [],
                          userRemoteConfigs                : [[credentialsId: 'oce-build-automation', url: 'git@github.marchex.com:marchex/omni-marchex-io.git']]])
            }
        }

        stage('Prepare') {
            steps {
              sh 'rm -rf node_modules'
              sh 'yarn cache clean'
              sh 'yarn'
            }
        }

        stage('Build') {
            steps {
              wrap([$class: 'Xvfb']) {
                sh 'yarn test --single-run --code-coverage'
              }
            }
            post {
                success {
                    junit testResults: 'test-reports/unit/unittest-results.xml', allowEmptyResults: true
                    cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: 'test-reports/unit/cobertura.xml', conditionalCoverageTargets: '70, 0, 0', failNoReports: false, failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
                }
            }
        }

        stage('Prepare Release') {
          steps {
            sh 'yarn run build'
            sh 'docker build -t oce-analytics-ui .'
            sh 'docker tag oce-analytics-ui qa-toolsnexus.marchex.com:5001/oce-analytics-ui:latest'
            sh "docker tag oce-analytics-ui qa-toolsnexus.marchex.com:5001/oce-analytics-ui:${currentBuild.number}"
          }
        }

        stage('Publish') {
            steps {
                sshagent(credentials: ['oce-build-automation']) {
                    sh "git tag -a ${currentBuild.number} -m '[jenkins] Releasing ${currentBuild.number}'"
                    sh 'git push --tags'
                }
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'oce-build-automation', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh 'docker login -u $USERNAME -p $PASSWORD qa-toolsnexus.marchex.com:5001'
                    sh 'docker push qa-toolsnexus.marchex.com:5001/oce-analytics-ui:latest'
                    sh "docker push qa-toolsnexus.marchex.com:5001/oce-analytics-ui:${currentBuild.number}"
                }
            }
            post {
                always {
                    sh 'git reset --hard origin/master'
                }
            }
        }

        stage('Deploy to QA') {
            steps {
              script {
                def swarmHost = 'qa-maui1.sea1.marchex.com'
                def swarmStack = 'oce-analytics-ui'
                def configBase = "${swarmStack}_client-config"

                def remoteDocker = "docker -H ${swarmHost}:2376 --tlsverify --tlscacert=/site/docker/docker-ca-cert.pem --tlscert=/site/docker/docker-client-cert.pem --tlskey=/site/docker/docker-client-key.pem"

                sh "sed -e \"s/{{RELEASE_VERSION}}/${currentBuild.number}/g\" < docker/docker-compose.qa.yml.template > ./docker-compose.qa.yml"

                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'oce-build-automation', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                  sh "${remoteDocker} login -u ${USERNAME} -p ${PASSWORD} qa-toolsnexus.marchex.com:5000"
                  sh "${remoteDocker} stack deploy --compose-file=./docker-compose.qa.yml --with-registry-auth --prune ${swarmStack}"
                  sh "./docker/scripts/remove_docker_configs.sh '${remoteDocker}' ${configBase} ${currentBuild.number}"
                }
              }
            }
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '15'))
        skipDefaultCheckout true
        timestamps()
        disableConcurrentBuilds()
    }
}
