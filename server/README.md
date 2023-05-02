# Univboard Backend Server

Server for [Univboard](https://github.com/DarthSalad/univboard)

Written in `TypeScript` using `Nest.js` - a backend framework based on Angular.

## Installation
- Clone the repo and `cd` into `server` directory

```sh
$ npm install
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=no_of_days_for_jwt_expiry
NODE_ENV=development
```

## Running the app

```bash
# development
$ npm run start

# watch mode (hot reload)
$ npm run start:dev
```

## API Reference
Protected routes: `Authorization` header - Bearer token (JWT token)

### Auth Routes

| Method | Route     | Protected | Description                |
| :-------- | :------- | :------ | :------------------------- |
| GET | `/auth/users` | `true` | Get the details of all users |
| GET | `/auth/` | `false` | Get auth status from HTTP cookie |
| POST | `/auth/register` | `false` | Create an account |
| POST | `/auth/login` | `false` | Login to your account |
| POST | `/auth/logout` | `true` | Logout |
| PATCH | `/auth/update-password` | `true` | Update user password |
### Clips Routes (All Protected Routes)

| Method | Route     | Description                |
| :-------- | :------- | :------------------------- |
| GET | `/clips/:user-id` | Get all the clips of user |
| POST | `/clips/:user-id/:clip-id` | Get a particular clip of the user |
| POST | `/clips/:user-id` | Add a new clip |
| PATCH | `/clips/:user-id/:clip-id` | Update details of a clip |
| DELETE | `/clips/:user-id/:clip-id` | Delete a clip |
| GET | `/clips/:user-id/:clip-id/get-collaborators` | Get the collaborators for a clip |
| PATCH | `/clips/:user-id/:clip-id/:collaborator-id/add-collaborators` | Add collaborators for a clip |
| DELETE | `/clips/:user-id/:clip-id/:collaborator-id/remove-collaborator` | Remove a collaborator from a clip |

## Technologies Used

- [Nest.js](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Passport.js](http://www.passportjs.org/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Typescript](https://www.typescriptlang.org/)

## Authors

[@DarthSalad](https://www.github.com/DarthSalad)

