# twoToTango
## API REST

This application was created to consume an API REST, the way to use it is easy, just follow the next steps

## Installation
The application was created using Node.js V16m I highly recommend update to this version in order to run correctly the program

Install the dependencies and devDependencies ( we use mongodb as localdb)
```sh
cd twoToTango/BackEnd
```

To run the application first you need a .env file in order to run correctly
```sh
touch .env
```
open the file and add the next information:
PORT=3000
SECRET_PASSWORD=th1S1sMyS3cr3TP4s$W0rdJWT
DATABASE=mongodb://localhost/twoToTango

feel free to change the variables, we dont have to share this information when we are working on production, I share it just for testing environment.

Once the file was created, we can procced to run our application

```sh
npm run dev
```
To run mongodb please open a new console and run
```sh
mongod
```


# Tech
- [node.js] - evented I/O for backend.
- [Express] - fast node.js network app framework.
- [Cors] - provide a Connect/Express middleware that can be used to enable CORS with various options.
- [jwt] - JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON.
- [dotenv] - Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
- [bcrypt] - bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher and presented at USENIX in 1999.
- [mongoose] - Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
- [nodemon] - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.



# FrontEnd
// TODO
the Frontend part is for testing purpose, is still on developer, there is only a view of loggin to take the info and send it to backend and receiving a bearer to login.
But is still on developer the left data.
So the way to make test by far is using an aplication to make request petitions like postman or insomnia.


# EndPoints
## There are 4 endpoints to use
All the endpoints should start /api + /endpoint
example: localhost:3000/api/createUser

## /createUser - POST
used to create a new user on database, it require 2 parameters
```sh
{
    "email": "example@email.com",
    "password": "password"
}
```
This petition will create the user and also we'll receive a bearer token.
The token should be storage on local storage, but in terms of testing we need to make a copy o the bearer token and paste it in the login endpoint 
Response:
```sh
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJlMjdiMzBkMmY1MTI2NTBjOThhZCIsImlhdCI6MTYzNTk2Nzg4MCwiZXhwIjoxNjM2MDUwNjgwfQ.manL2dBgrbgCoqsM3ZQ885zDOgmuW940gulSvMSIjh0"
}
```
Once the token is created we have 1 hour to use it, otherwise it will expire, and is necessary to make login again.

## /login 
The endpoint login need on the header a bearer token, we need to add our email and password to confirm that we are who wants to login, once we have logged correctly, we will receive an object as we saw before
header:
```sh
autorization : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJlMjdiMzBkMmY1MTI2NTBjOThhZCIsImlhdCI6MTYzNTk2Nzg4MCwiZXhwIjoxNjM2MDUwNjgwfQ.manL2dBgrbgCoqsM3ZQ885zDOgmuW940gulSvMSIjh0
```

```sh
{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJlMjdiMzBkMmY1MTI2NTBjOThhZCIsImlhdCI6MTYzNTk2Nzg4MCwiZXhwIjoxNjM2MDUwNjgwfQ.manL2dBgrbgCoqsM3ZQ885zDOgmuW940gulSvMSIjh0"
}
```

Now that we have the token we have access to  all protected enpoints

## /users GET
users endpoint will show you a list of all users storaged into our local database
note that only register users can have access to this list.
```sh
[
    {
        "id": "617f3ab54537eadc3395144e",
        "email": "myemail@email.com"
    },
    {
        "id": "617f3ae7c63b33ed192e1597",
        "email": "anotheremail@email.com"
    }
]
```

# helps options
There is a carpet called helps into BackEnd folder, there is a file that you can import into postman or insomnia to make the request petition


