/**
 * User does not exist
 */
class UserDoesNotExist extends Error {
  code:number
  constructor () {
    super()
    this.code = 404
    this.message = 'The provided user does not have Github account!'
  }
}

export {
  UserDoesNotExist
}
