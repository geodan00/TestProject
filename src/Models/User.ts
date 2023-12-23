import Hash from "../Services/Hash"

export default class User {
    public userName: string
    public password: string
    
    public name?: string
    public email?: string
    public picture?: string
    
    constructor(userName : string, password : string) {
        this.userName = userName
        this.password = Hash(password)
    }
}