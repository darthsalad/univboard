## Description

Server for [Univboard](https://github.com/DarthSalad/univboard)
<br>Written in `TypeScript` using `Nest.js` - a backend framework based on Angular.

## Installation
- Clone the repo and `cd` into `server` directory

```bash
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


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `image` | `file/input_buffer` | The image uploaded by the user|

