# we-love-movies-backend

## Purpose

This repo serves as the backend to the starter-movie-frontend repo.

### Info

This repo utilizes knex to access and make changes to the PostgreSQL database.
The docs folder contains instructions for setting up the database and the routes managed by this code.

### Files and Folders

- `src/db/migrations` This folder contains the migrations for creating the tables
- `src/db/seeds` This folder contains the seed data for the tables. This is done by using the command `npx knex seed:run`
- `src/db/connection.js` This file contains the configuration code for knex
- `src/errors` This folder contains error handling code for methods not allowed and an asyncErrorBoundary function.
- `src/movies` This folder contains the controller, router, and service files that manage data for the following routes:
    - `GET /movies`
    - `GET /movies/:movieId`
    - `GET /movies/:movieId/theaters`
    - `GET /movies/:movieId/reviews`
- `src/reviews` This folder contains the controller, router, and service files that manage data for the following routes:
    - `DELETE /reviews/:reviewId`
    - `UPDATE /reviews/:reviewId`
- `src/theaters` This folder contains the controller, router, and service files that manage data for the following route:
    - `GET /theaters`
- `src/utils` This folder contains the `map-properties` and `reduce-properties` files that use lodash in order to organize data from the queries.
- `src/app.js` This file contains the express app and directs all routes to teh appropriate routers.
- `src/server.js` This file contains the server code


