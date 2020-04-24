# Overview

Simple HTTP server to retrieve player counts from a NWN 1 game server.

# Running locally

## Setup

First of all, you'll need to setup a file at `app/.env` that should look something like the following:

```
PORT=<port you want your http server to run on>
NWN_PORT=<port of your nwn server, likely this is 5121>
NWN_HOST=<ipv4 address or host name of your nwn server>
```

## With NPM

```bash
cd app
npm i
npm run build
npm start
```

Then you can visit [localhost:8080/get-status](http://localhost:8080/get-status) to see status for your server discovered by this service.

## With Docker

The commands are captured in bash scripts in the commands folder. If you are on a system without bash, reference the `docker` cli commands in the files referenced. Otherwise, you can use the following to get up and running:

```bash
./commands/build.sh && ./commands/run.sh
```

Then you can visit [localhost:8080/get-status](http://localhost:8080/get-status) to see status for your server discovered by this service.

# Development

To develop with live reload on file changes, use the following commands:

```bash
cd app
npm i
npm start:dev
```

Then you can visit [localhost:8080/get-status](http://localhost:8080/get-status) to see status for your server discovered by this service.

It will not pick up on changes to the .env file.