# install:
yarn add typescript -D
yarn tsc --init
yarn add ts-node-dev -D
yarn add express
yarn add @types/express -D
yarn add knex
yarn add sqlite3

# scripts:
"scripts":{
    "start": "tsnd --transpile-only --ignore-watch node_modules --respawn src/server.ts"
  }