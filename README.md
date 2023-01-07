# XLink Core

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Using Docker
```shell
# start database
docker compose up -d database
docker compose up -d rabbitmq

# stop database
docker compose stop database
docker compose stop rabbitmq
```

## Utils
```shell
# Generate secret
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
