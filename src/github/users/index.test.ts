import { User } from '.'
import * as mockedData from '../test-fixtures'
import axios from 'axios'
import { UserDoesNotExist } from '../../lib/errors/index'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Gethub Users', () => {
  it('should return 404 when user does not exist', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new UserDoesNotExist())
    )

    try {
      const githubUser = new User('fake-userXa78e4')
      await githubUser.get()
    } catch (error) {
      expect(error.code).toBe(404)
      expect(error.message).toBe('The provided user does not have Github account!')
    }
  })

  it('should return user when it exist', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedData.user
      })
    )

    const githubUser = new User('fake-user')
    const user = await githubUser.get()

    expect(user.name).toBe('fake user')
    expect(user.userName).toBe('fake-user')
  })
})
