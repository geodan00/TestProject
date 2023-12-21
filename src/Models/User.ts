import Hash from "../Services/Hash"

export default class User {
    public userName: string
    public password: string
    constructor(userName : string, password : string) {
        this.userName = userName
        this.password = Hash(password)
    }
}