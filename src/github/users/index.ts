import axios from 'axios'
import { IUser } from '../@types'
import { UserDoesNotExist } from '../../lib/errors/index'

/**
 * Github class is responsible to contact with github
 * We are getting the repositires for a specific user.
 * https://developer.github.com/v3/repos/
 * API: https://api.github.com/users/
 */
class User {
    userName :string

    readonly url: string

    constructor (user :string) {
      this.userName = user
      this.url = `https://api.github.com/users/${this.userName}`
    }

    /**
     * Call github to get the user
     * Return the user if exist or throw error
     */
    async get () : Promise<IUser> {
      try {
        // Get user from Github
        const { data } = await axios.get(this.url)

        const user: IUser = {
          name: data.name,
          userName: data.login
        }

        return user
      } catch (error) {
        throw new UserDoesNotExist()
      }
    }
}

export {
  User
}
