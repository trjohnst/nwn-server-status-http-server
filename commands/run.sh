#!/usr/bin/env bash

docker run -p 4000:8080 --env-file ./app/.env trjohnst/nwn-server-status-http-server