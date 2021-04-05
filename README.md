# auth-server
## Setup
* First creating the repository on github.
* Clone it on the local machine.
* npm i express dotenv cors morgan base-64 bcrypt jsonwebtoken generate-password jest nodemon mongoose supertest or @code-fellows/supergoose.
* Create the needed directories and files for the application.
## DataBase 
MongoDB
## The end points for the Application
* ( /signup ) with the POST method to save username and password in the database and generate a token for the user.
* ( /singin ) with the POST method to access the profile after validate the username and the password.
* ( /users ) with the get method to login without rewrite the username and password based on the token.

## Middleware in the Application 
* morgan.
* basicAuth to validate the password.
* bearerAuth to verify token.

## Heroku Deploying Url's

[Heroku](https://hamza-auth-server.herokuapp.com/)<br>

Note 1 : use postman to check it out and fill the body ( json format ) with the property username and password when signing up. <br>
Note 2 : use postman to check it out and fill the authorization with your username and password.
Note 3 : enter your token and login in the users page.

## Github Test
[Github Actions](https://github.com/hamzashamoun96/auth-server/actions)

## Github Pull Request
[Pull Request](https://github.com/hamzashamoun96/auth-server/pull/1)

## Test
* for testing the application run the command npm test.

## UML 
![uml](/uml.png)