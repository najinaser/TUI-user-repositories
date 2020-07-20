import { Branch } from '.'
import * as mockedData from '../test-fixtures'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Gethub branches', () => {
  it('should return 404 when there are no branches', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('some branch error'))
    )

    try {
      const branch = new Branch('fake-user', 'fake-branch')
      await branch.get()
    } catch (error) {
      expect(error.message).toBe('some branch error')
    }
  })

  it('should return branchs for a repo', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedData.branch
      })
    )

    const branch = new Branch('fake-user', 'fake-branch')
    const branchs = await branch.get()

    expect(branchs).toEqual(

      expect.arrayContaining([

        expect.objectContaining({
          name: expect.any(String),
          sha: expect.any(String)
        })
      ])
    )
  })

  it('should be able to change the repo name', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockedData.branch
      })
    )

    const branch = new Branch('fake-user', 'fake-branch')
    branch.setRepoName('TEST-SET')

    await branch.get()

    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/repos/fake-user/TEST-SET/branches')
  })
})
