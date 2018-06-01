#!/usr/bin/env bash

yarn build
docker build -t oce-analytics-ui .

# This addresses an open defect with Docker on Windows
# see: https://github.com/docker/for-win/issues/1560
if [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
  docker volume rm -f /host_mnt/c
fi
docker-compose -f docker/docker-compose.dev.yml up --force-recreate --remove-orphans $@
