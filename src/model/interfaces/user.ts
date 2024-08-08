import { Email, Hash, Moment, UserId } from "@primitives"

interface IUser {
    id: UserId,
    username: string,
    passwordHash: Hash,
    email: Email,
    moment: Moment
}

function queryRowToUser(row: any): IUser {
    if (!("id" in row && "username" in row && "password_hash" in row && "email" in row && "moment" in row)) {
        throw new Error("Invalid query row to convert into IUser")
    }

    return {
        id: new UserId(row.id),
        username: row.username,
        passwordHash: new Hash(row.password_hash),
        email: new Email(row.email),
        moment: new Moment(row.moment)
    }
}

export { IUser, queryRowToUser }
