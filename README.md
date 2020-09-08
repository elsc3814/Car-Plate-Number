# Car Plate Number

This is a technical task for Danske Bank.

## Project structure

This project is made from three parts:
- Angular app
- Express node.js backend
- Integration tests

## Angular app

### Preparation 

`npm install` that will install all required dependencies.

### Launching the program

`npm start` that will start server at `http://localhost:4200/`.

### Run unit tests

`npm run test` that will start Karma tests runner.

### Prerequisites

Express server should be running.

## Express node.js server

### Preparation 

`npm install` that will install all required dependencies.

### Launching the program

`npm start` that will start server at `http://localhost:3000/`.

## Integration tests

### Preparation 

`npm install` that will install all required dependencies (including Chrome driver).

### Run integration tests

`npm run test` that will start Selenium tests.

### Prerequisites

Angular app and node.js server should be running.

## Docker Container

Docker container is available for angular application

### Create Docker Image

`docker build -t angular-app .` that will create an image in `angular-app` repository

### Run Docker Container

`docker run -d -it -p 80:80/tcp --name angular-app angular-app:latest` it will newly created docker image