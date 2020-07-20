import { header as headerMiddleware } from './lib/middlewares/request'
import { User } from './github/users'
import { Repository } from './github/repositories'
import { IUser, IRepository } from './github/@types'
import express = require('express');

// Create a new express app instance
const app: express.Application = express()

// apply middlewares.
// header middleware used to validate the acceps key
app.use(headerMiddleware)

/**
 * GET base_url/repositories/:user
 * This end point is to obtain the user repositories
 * :user could be any GitHub user name
 */
app.get('/repositories/:user', async function (req, res) {
  let response

  try {
    // get GitHub User
    const userName: string = req.params.user
    const githubUser = new User(userName)
    const user: IUser = await githubUser.get()

    // Get user Repos
    const repo = new Repository(user)
    const userRepositories: IRepository[] = await repo.getNotForked()

    response = {
      status: {
        code: 200,
        message: 'repositories has been called succefully'
      },
      data: userRepositories
    }
  } catch (e) {
    response = {
      status: {
        code: e.code || 500,
        message: e.message || 'Internl server error!'
      },
      error: e
    }
  }

  res.send(JSON.stringify(response))
})

// to validate the health of the application
app.get('/health', function (req, res) {
  const response = {
    status: {
      code: 200,
      message: 'The app is healthy!'
    }
  }

  res.send(response)
})

app.listen(3000, function () {
  console.log('App is listening on port 3000!')
})
