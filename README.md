# Storefront Backend Project

## Getting Started

This repo contains a prject of Advanced Full-stack Web Developer nanodegree training to build a store front API example.

## Basic requirements
to run this project on your machine you must have:
- a valid connection to Postgree database server.
- NodeJS v18 installed on hosting machine.
- install db-migrate globally.
- running relevent scripts to operate.
    - 1- Insure you have yarn and db-migrate intalled globaly.
    - 2- install DOTENV package and create a `.ENV` file to contain environment variables with the following structure:

            POSTGRES_HOST= your_host_name_or_IP
            POSTGRES_DB= your_database_name
            POSTGRES_TEST_DB= your_testing_database_name
            POSTGRES_USER= database_username
            POSTGRES_PASSWORD= database_user_password
            POSTGRES_PORT= Postgres_operating_port
            ENV=dev
            BCRYPT_PASSWORD= your_bcrypt_salt
            SALT_ROUNDS=10

    - 3- Create a database on postgree server (storefront_dev database for development using `yarn create-dev-db` and storefront_test database for testing using `yarn create-test-db` ).
    - 4- Run `npm run install` to install required packages.
    - 5- Run `yarn dev-migrations` to apply database migrations containing tables structures.
        if you want to have some datato test with you can run `yarn seed` to seed database after building project.
    - 6- Run `yarn build` to build project
    - 7- Insure your environment oprational and error free with testing it `yarn test`
    - 8- To start run `yarn watch` for development or for production use `yarn start`

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. 

## Scripts used
- `build` to build project
- `create-dev-db` to create development database
- `create-test-db` to create test database
- `dev-migrations` applay migrations to development database
- `reset-test-db` reset migrations for test database
- `reset-dev-db` reset migrations for development database
- `start` start project in production
- `test` start tests on project modules and endpoints
- `watch` start watch mode
- `tsc` start tsc
- `prettier` run prettier 
- `seed` start seeding database eith data to evalute it

## Notes

- for creating database you need a valid connection to Postgres server with administrative rights to create database and manage users.
- Connect with PSQL tool.
- Create development database with `yarn create-dev-db;` and testing database with `yarn create-test-db;`
- Insure that the database user has all privileges on both databases.
- Update `.ENV` file with databases names and user data to have a valid connection and test it.
- Review `REQUIREMENTS.md` for more information about routes and data structures.
