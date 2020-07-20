export interface IUser {
    name: string
    userName: string
}

export interface IBranch {
    name: string
    sha: string
}

export interface IRepository {
    name: string
    ownerLogin: string
    fork: boolean
    branches: IBranch[]
}
