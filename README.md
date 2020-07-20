# TUI-Github-User-Repositories

Tui-task,
This project built for api consumer. It will list the github repositories or the given user, which are not forks.

## Technologies Used

- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Standard JS](https://standardjs.com/)
- [GitHup API](https://developer.github.com/v3)


### Prerequisites

- NodeJS ^12.16
- NPM ^6.14

### Project Setup

```
npm install
npm build
npm start     => to start the project
npm dev       => for development mode
npm lint      => to check the standard format
npm lint:fix  => to fix code format
npm test      => to run the ubi test
```
The project will run on (http://localhost:3000), 
To check the project health, call http://localhost:3000/health

## Contributing to this project

Follow the standard of the contribution and lets discuss it before the implementation.

 - API first, Agree about the API before the implementation.
 - Update the YAML file to fit the client requirnment
 - Build the implementation
 - Ensure thr implementation results the same as the YAML file

## TODO
- Be sure the implementation of NOT forked repos is the right one
- Be sure about the commint sha is the last commint sha
- Build 404 page
- Refactor the API controllers