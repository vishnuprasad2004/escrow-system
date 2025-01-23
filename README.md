<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Escrow System with NestJS + MongoDB

## Description
This concept I used here is pretty Intuitive where I created 3 collections: User, Transaction, Escrow.
User Collection, keeps all the user details,like money the user has, and transactions he/she has completed earlier.
Transaction Collection, keeps all the transactions which happened
Escrow Collection, keeps all the escrow transactions, whether they are ACTIVE, RELEASED, or REFUNDED

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Check the Postman Collections: <a href="https://www.postman.com/lunar-module-geoscientist-36395329/workspace/escrow-system/collection/36933233-2805ca9b-4eb2-4935-86ed-3e7dcfee150d?action=share&creator=36933233">Postman Workspace Link</a>