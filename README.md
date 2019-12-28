# high_stakes-be
## Backend for DSC Web Dev Team's Project

**docs/**
- contains documentation for the API

**src/**  
Source code, built in Node.js + Express
- **config/**
    - configuration files
- **controllers/**  
    - get, put, post, delete for resources  
- **knex/**  
    - **migrations/**  
        - sql changes to be made to the databse
    - **seed/**  
        - initial data for the database
    - knex.js
        - import intilized knex connection from here
    - knexfile.js
        - database connection config
- **middleware/**
    - middleware like body-parser etc.
- **routes/**
    - routes to the controllers to be defined here.
- index.js
    - entry point for our node app.
- ecosystem.config.js
    - entry point for pm2.

**Dockerfile**
- Contains steps to build Node Apps container.
- Read more about Dockerfile [here](https://docs.docker.com/engine/reference/builder/).

**docker-compose.yml**
- Contains steps to set up a whole environment for the deployment of App.
- Creates Database and HTTP Server instances as well.
- Read more about docker-compose.yml [here](https://docs.docker.com/compose/compose-file/).