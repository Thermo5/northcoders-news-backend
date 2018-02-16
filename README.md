# Northcoders News API

Northcoders News API is a RESTful api which is build using Express.js, Node.js, MongoDB and Mongoose.js. The MongoDB is hosted on mlabs, and the API is deployed through Heroku.

## Getting Started

And this is a link to the [API](https://northcoders-news-backend.herokuapp.com)

The frontend of this project can be found [here](https://github.com/Thermo5/northcoders-news-frontend).


## Prerequisites

```
    Node.js v8.6.0 or higher
    npm v5.6.0
    git version 2.14.3
```
## Installation
To run this project you will need to clone it onto your local machine and install all dependencies.

Navigate to you chosen directory and run the following command in the commandline to clone the package:
```
    git clone https://github.com/Thermo5/northcoders-news-backend.git
```

To install all depencency run:
```
    npm install
```

Before starting the project, please open a second shell in your terminal and ensure mongoDB is running with the command:

``` 
    mongod
```

Once this is set up, you should be able to start the server. 

Run this command in the app directory on the command line.
```
    npm start
```

# Testing

To test the API navigate to the project directory and enter the following command

```npm test```

Testing was carried out using Mocha, Chai and Supertest


## API Routes

```
GET /api/topics
```
Get all the topics

```
GET /api/topics/:topic_id/articles
```
Return all the articles for a certain topic

```
GET /api/articles
```
Returns all the articles
```
GET /api/articles/:article_id
```
Returns a JSON object with the article information for the specified article

```
GET /api/articles/:article_id/comments
```
Get all the comments for an individual article

```
POST /api/articles/:article_id/comments
```
Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: {"comment": "This is my new comment"}

```
PUT /api/articles/:article_id
```
Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: /api/articles/:article_id?vote=up

```
PUT /api/comments/:comment_id
```
Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: /api/comments/:comment_id?vote=down

```
DELETE /api/comments/:comment_id
```
Deletes a comment

```
GET /api/users
```
Returns all users

```
GET /api/users/:username
```
Returns a JSON object with the profile data for the specified user.


