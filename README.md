# TUI-Github-User-Repositories

Tui-task,
This project built for api consumer. It will list the github repositories for the given user, which are not forks.

## Technologies Used

- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Standard JS](https://standardjs.com/)
- [GitHup API](https://developer.github.com/v3)


### Prerequisites

- NodeJS ^12.16
- NPM ^6.14

### Project Setup
To start the project
```
npm install
npm build
npm start
```
For development
```
npm dev       => for development mode
npm lint      => to check the standard format
npm lint:fix  => to fix code format
npm test      => to run the ubi test
```
The project will run on (http://localhost:3000), 
To check the project health, call http://localhost:3000/health

## Standard of Contributing

 - API first, Agree about the API before the implementation.
 - Update the YAML file to fit the client requirnment.
 - Implementation.
 - Ensure the implementation results the same as the YAML file.

## TODO
- Ensure about the commint sha is the last commint sha
- Build 404 page
- Refactor the API controllers