# high_stakes-be
## Backend for DSC Web Dev Team's Project

**doc/**
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