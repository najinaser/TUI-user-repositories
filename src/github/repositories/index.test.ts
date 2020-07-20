import { Repository } from '.'
import * as mockedData from '../test-fixtures'
import axios from 'axios'
import { IUser } from '../@types'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Repository Users', () => {
  it('should return 500 when repos does not exist', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('some error'))
    )

    try {
      const fakeUser:IUser = {
        name: 'karaja naji',
        userName: 'karaja-naji'
      }

      const repository = new Repository(fakeUser)
      await repository.get()
    } catch (error) {
      expect(error.message).toBe('some error')
    }
  })

  it('should return repositories for specific user', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedData.repository
      })
    ).mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedData.branch
      })
    )

    const fakeUser:IUser = {
      name: 'fake user',
      userName: 'fake-user09193X'
    }

    const repository = new Repository(fakeUser)
    const repositories = await repository.get()

    expect(repositories[0].name).toBe('ecomerce')
    expect(repositories[0].ownerLogin).toBe('fake-user')
    expect(repositories[0].fork).toBe(false)

    expect(repositories).toEqual(

      expect.arrayContaining([

        expect.objectContaining({
          name: expect.any(String),
          ownerLogin: expect.any(String)
        })
      ])
    )
  })
  it('should all repositories be not forked', async () => {
    // TODO, provide full- data with fork true- data to fulfill this function needs

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedData.repository
      })
    ).mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedData.branch
      })
    )

    const fakeUser:IUser = {
      name: 'fake user',
      userName: 'fake-user09193X'
    }

    const repository = new Repository(fakeUser)
    const repositories = await repository.getNotForked()
    expect(repositories[0].fork).toBe(false)
  })
})
