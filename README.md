<h1 align="center">

Fellow Finder Api :dog:

</h1>

<p align="center">
  Fellow Finder - Find a friend
  <br>
  <br>

  <a href="www.linkedin.com/in/rhalfoliveira">
    <img alt="Made by Rhalf Oliveira" src="https://img.shields.io/badge/made%20by-Rhalf%20Oliveira-%237519C1">
  </a>
  <a href="https://github.com/qwwerty/happy-api/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/qwwerty/fellow-finder">
  </a>

</p>

## Functional Requirements

- [x] It must be possible to register a pet.
- [x] It should be possible to list all the pets available for adoption in a city.
- [x] It should be possible to filter pets by their characteristics.
- [x] It should be possible to view details of a pet for adoption.
- [x] It must be possible to register as an OB.
- [x] It must be possible to log in as an OBS.

## Business Rules

- [x] To list the pets, we must inform the city.
- [x] An OBS must have a WhatsApp address and number.
- [x] A pet must be connected to an OBS.
- [x] The user who wants to adopt will contact the ORG via WhatsApp.
- [x] All filters, other than city, are optional.
- [x] For an OBS to access the application as an admin, it must be logged in.
- [x] To create a pet, the org must be logged in.

## :white_check_mark: Requirements

- [Node](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/lang/en/)

## :checkered_flag: Starting

```bash
# Clone this project
$ git clone https://github.com/qwwerty/fellow-finder

# Access
$ cd fellow-finder

# Install dependencies
$ npm install

# Rename the .env.example file to .env and configure environment variables

# Run the container docker
$ docker compose up -d

# Run prisma migrates
$ npx prisma migrate dev

# Run the project
$ npm run dev

# Run unit tests
$ npm run test

# Run e2e tests
$ npm run test:e2e

# The server will initialize in the <http://localhost:3333>
```
