# MERN ChatGPT

OpenAI's ChatGPT integration in the MERN stack

## Features

-   Authentication Module
-   Chat Module
-   Client route protection
-   Server auth middleware
-   OpenAI ChatGPT integration demo

## Tech Stack

**Client:** React, Zustand, Bootstrap 5 Theme, Axios, Yup

**Server:** Node, Express, MongoDB, Mongoose ODM, OpenAI API

## Server Environment Variables

To run this project, you will need to add the following environment variables to server's .env file

`PORT = 5000`

`NODE_ENV = development`

`MONGODB_URL = mongodb://localhost:27017/mern-chatgpt`

`CLIENT_URL = http://localhost:3000`

`SESSION_SECRET = shhhh!!!!`

`OPENAI_API_KEY = get_your_own_key_from_openai`

## Client Environment Variables

To run this project, you will need to add the following environment variables to client's .env file

`VITE_NODE_ENV = development`

`VITE_PORT = 3000`

`VITE_SERVER_URL = http://localhost:5000/api`

## Clone

Clone the repo

```bash
  git clone https://github.com/jillBhatt26/mern-chatgpt.git
```

Change to directory

```bash
  cd mern-chatgpt
```

Install dependencies

```bash
  cd client / server && yarn install --frozen-lockfile
```

Add .env file and add the env variables mentioned above

```bash
  cd client / server && touch .env
```

Start server in development mode

```bash
  cd server && yarn dev
```

Start client in development mode

```bash
  cd client && yarn dev
```
