import axios from 'axios'
import { Branch } from '../branches'
import { IUser, IRepository, IBranch } from '../@types'

/**
 * Github class is responsible to contact with github
 * We are getting the repositires for a specific user.
 * for more info, please check the documentation on
 * https://developer.github.com/v3/repos/
 */
class Repository {
   user :IUser
   readonly url :string
   repos : IRepository[]

   constructor (user: IUser) {
     this.user = user
     this.url = `https://api.github.com/users/${this.user.userName}/repos`
     this.repos = []
   }

   /**
   * It returns an array of user repositories
   */
   async get (): Promise<IRepository[]> {
     if (!this.repos.length) {
       // get Repositories from GitHub
       const { data } = await axios.get(this.url)

       // prepare response array
       this.repos = await this.sanitiseData(data)
     }

     return this.repos
   }

   async getNotForked () : Promise<IRepository[]> {
     await this.get()

     return this.repos.filter((repo: any) => !repo.fork)
   }

   /**
     * sanitise the data to fit the clients
     * Also, it will get the branches for each Repo
     *
     * For now: I have wrote getting the branches here to avoid another loop
     * @param repos
     */
   async sanitiseData (repos: any): Promise<IRepository[]> {
     const res = []
     const branch = new Branch(this.user.userName)

     for (const repo of repos) {
       // repo name
       const name = repo.name

       // Owner Login
       const ownerLogin = repo.owner.login

       // fork
       const fork = repo.fork

       // For each branch it’s name and last commit sha
       branch.setRepoName(name)
       const branches :IBranch[] = await branch.get()

       res.push({
         name,
         ownerLogin,
         fork,
         branches
       })
     }

     return res
   }
}

export {
  Repository
}
