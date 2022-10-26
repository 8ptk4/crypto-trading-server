# Crypto Trading Platform - Server
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Crypto Trading Backend with MongoDB Atlas, also including Sqlite3 migrate setup.
	
## Technologies
"axios": "^0.21.1",
"bcryptjs": "^2.4.3",
"body-parser": "^1.19.0",
"cors": "^2.8.5",
"dotenv": "^16.0.3",
"express": "^4.17.1",
"jsonwebtoken": "^8.5.1",
"mongodb": "^3.3.3",
"mongoose": "^6.6.5",
"morgan": "^1.9.1",
"socket.io": "^4.5.3",
"sqlite3": "^5.0.0"
	
## Setup
Constructed from beginning with Sqlite database in mind. In the db folder there is a migrate.sql file to setup the database. At later stages I've start using MongoDB Atlas, the sqlite queries are therefor commented out in code.

To use with MongoDB Atlas and setup JWT secret the following lines needs to exist in .env.
- .env `JWT_ACCESS_SECRET=...
    ATLAS_USERNAME=...
    ATLAS_PASSWORD=...
    ATLAS_URI=...`

- run ```npm i && npm start```