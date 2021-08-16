# MapGallery-API
# NodeJS secure RESTFUL api

A NodeJS api with koa.js for user authentication and for saving information about their games. This project includes user's password hashing, authorization tokens and connection to mongoDb.

## Installation
### Clone the repo

```shell
git clone https://github.com/sonuk-dev/MapGallery-API
cd MapGallery-API
```

### Installing packages

```shell
npm install
npm install nodemon
npm install bcrypt
npm install koa
npm install koa-body
npm install joi
npm install mongoose
npm install koa-jwt
```
To start the program use

```shell
nodemon server
```
## Available end-points

### POST /auth/login

User log in

#### Request body (raw)

```shell
{
    "email": "example@gmail.com",
    "password": "your password"
}
```

### POST /auth/registration

User registration

#### Request body (raw)

```shell
{
    "nickname": "your nickname",
    "email": "example@gmail.com",
    "password": "your password"
}
```
### GET /user/:id

Return user by id

#### Headers

Authorization: "authorization token"

### GET /users

Return all users

#### Headers

Authorization: "authorization token"

### GET /users/topScores

Return all users sorted by their best scors

#### Headers

Authorization: "authorization token"

### PUT /user/changeBestScore

Update user's best score in database

#### Headers

Authorization: "authorization token"

#### Request body (raw)

```shell
{
    "_id": userId(number),
    "bestScore": newBestScore(number)
}
```

### PUT /user/update

Update user's data

#### Headers

Authorization: "authorization token"

#### Request body (raw)

```shell
{
    "_id": userId(number),
    "nickname": "your new nickname",
    "email": "yourNewEmail@gmail.com"
}
```

### PUT /games/addGame

Creat and save in database a new game object

#### Headers

Authorization: "authorization token"

#### Request body (raw)

```shell
{
    "userId": user's id (number),
    "date": "Date when the game was over"(Date),
    "score": Thta game's score (number)
}
```

### GET /games/getUserGames/:id

Return all the user's games sorted by time by user id

#### Headers

Authorization: "authorization token"
