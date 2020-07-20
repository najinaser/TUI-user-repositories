import axios from 'axios'
import { IBranch } from '../@types'

/**
 * Branch will contact with GitHub to get branches for specific Repo
 * To get the branches we need the repo name and the user name
 * Documentation: https://developer.github.com/v3/
 * API : `https://api.github.com/repos/${userName}/${repoName}/branches
 */
class Branch {
   repoName: string
   userName: string
   url: string

   constructor (userName: string = '', repoName: string = '') {
     this.repoName = repoName
     this.userName = userName
     this.url = `https://api.github.com/repos/${userName}/${repoName}/branches`
   }

   /**
    * To set the name of the repo,
    * So the client could change the repo name from outside
    * @param repoName
    */
   setRepoName (repoName: string) {
     this.repoName = repoName
     this.url = `https://api.github.com/repos/${this.userName}/${this.repoName}/branches`
   }

   /**
     * return the branches for specofic repo
     * It will call GitHub
     * senitise the data
     */
   async get () :Promise<IBranch[]> {
     // get Repositories from GitHub
     const { data } = await axios.get(this.url)

     // prepare response array
     const response = await this.sanitiseData(data)

     return response
   }

   /**
    * sanitise the data to fit the clients
    * @param branches
    */
   sanitiseData (branches: any) :IBranch[] {
     const res = []
     // branch meta data
     for (const branch of branches) {
       // branch name
       const name = branch.name

       // branch last SHA
       const sha = branch.commit.sha

       res.push({
         name,
         sha
       })
     }

     return res
   }
}

export {
  Branch
}
