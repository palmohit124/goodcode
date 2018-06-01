#!/usr/bin/env bash

if [[ $# -ne 3 ]]; then
  cat <<EOF
USAGE: remove_docker_configs docker_command config_name release_version
EOF
  exit 1
fi

DOCKER_COMMAND=$1
CONFIG_NAME_BASE=$2
CONFIG_LATEST_VERSION=$3

RELEASE_CONFIG_NAME="${CONFIG_NAME_BASE}-${CONFIG_LATEST_VERSION}"

CONFIG_HASHES=$(${DOCKER_COMMAND} config ls --quiet --filter name=${CONFIG_NAME_BASE})
RELEASE_CONFIG_HASH=$(${DOCKER_COMMAND} config ls --quiet --filter name=${RELEASE_CONFIG_NAME})

if [[ $(echo ${RELEASE_CONFIG_HASH} | cut -f 1- -d' ' --output-delimiter=$'\n' | wc -l) -gt 1 ]]; then
  echo "More than 1 current configurations returned from docker" > $2
  exit 2
fi

for CONFIG in ${CONFIG_HASHES}; do
  if [ ${RELEASE_CONFIG_HASH} != ${CONFIG} ]; then
    # Ignore miscellaneous errors when removing configs.
    # This most likely occurs when the previous container hasn't been completely shut-down yet.
    ${DOCKER_COMMAND} config remove ${CONFIG} || true
  fi
done
