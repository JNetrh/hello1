# hello1

## Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [Node.js 14](https://nodejs.org/en/)
- [Yarn 1.x](https://classic.yarnpkg.com/lang/en/)

## Global

### Installation

Run this command in root of project

```
yarn
```

## Backend

### Configuration

- In `backend`, copy `.env.example` as `.env`

**Environment variables**

- `PORT` - backend port
- `PLAYGROUND` - whether graphql playground is available at /graphql
- `APP_ENV` - Used when sending emails. Possible values `production` or other string. For local development e.g. `staging`.
- `JWT_SECRET` - Some random string as secret for JWT
- `SKIP_AUTH` - perform api calls without authorization

### Local development

In `backend` folder:

```sh
docker-compose up
```

This will create:

- MySQL on `localhost:3306`, with user `root`, password `password` and database `hello1` on server `database`
- App container, install dependencies and run `yarn dev`

### Migrations and seeds

Before you can use the API, you have to create tables in your local database. In order to do that you have to run migrations.
**IMPORTANT:** Every time a new migration is added you have to run migrations too!

All `prisma` commands have to be executed inside the app container. To connect to the container, open a new terminal window and run:

```sh
docker exec -it backend_api_1 bash
```

**Inside the container**
To create all database tables or apply new migrations:

```sh
npx prisma generate
npx prisma migrate dev --name init --preview-feature
```

[More info about prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres)

## Frontend

### Configuration

Go to `frontend`, copy `.env.example` to `.env`.

**Environment variables**

- `REACT_APP_GRAPHQL_URI` - backend API URL

### Install Dependencies

Use `yarn install` to install dependencies.

### Run local development server

```sh
yarn dev
```

## Deployment

TBD
