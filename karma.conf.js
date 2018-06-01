// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: ['html', 'json', 'cobertura'],
      dir: 'test-reports',
      'report-config': {
        html: {
          subdir: 'report-html'
        },
        json: {
          file: 'unit/karma-final.json'
        },
        cobertura: {
          file: 'unit/cobertura.xml'
        }
      },
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul', 'junit']
      : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['MchxHeadlessChrome'],
    singleRun: false,
    junitReporter: {
      outputDir: 'test-reports/unit',
      outputFile: 'unittest-results.xml',
      useBrowserName: false
    },
    customLaunchers: {
      MchxHeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--disable-translate', '--disable-extensions', '--remote-debugging-port=9223']
      }
    }
  });
};
