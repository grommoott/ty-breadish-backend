import bdClient from "@api/bdClient";
import getUser from "@api/get/getUser";
import getUserByEmail from "@api/get/getUserByEmail";
import getUserByUsername from "@api/get/getUserByUsername";
import isEmpty from "helpers/isEmpty";
import { IUser } from "@interfaces";
import { Email, Hash, IBDPrimitive, UserId } from "@primitives";

export default async function updateUser(id: UserId, data: { username?: string, passwordHash?: Hash, email?: Email }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const userWithId: IUser | Error = await getUser(id)

        if (userWithId instanceof Error) {
            return new Error(`User with such id(${id}) isn't exists`)
        }

        const username: string | undefined = data.username
        const email: Email | undefined = data.email

        if (username) {
            const userWithUsername: IUser | Error = await getUserByUsername(username)

            if (!(userWithUsername instanceof Error) && userWithUsername.id.id != id.id) {
                return new Error(`User with such username(${username}) is already exists`)
            }
        }

        if (email) {
            const userWithEmail: IUser | Error = await getUserByEmail(email)

            if (!(userWithEmail instanceof Error) && userWithEmail.id.id != id.id) {
                return new Error(`User with such email(${email}) is already exists`)
            }
        }

        const nameConverter: (name: string) => string = (name: string): string => {
            switch (name) {
                case "passwordHash":
                    return "password_hash"

                default:
                    return name
            }
        }

        const valueConverter: (key: string, value: any) => string = (key: string, value: any): string => {
            switch (key) {
                case "username":
                    return `'${value}'`

                default:
                    return (value as IBDPrimitive).toBDView()
            }
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`
        }).join(",")

        bdClient.query(`update users set ${setString} where id=${id} `)
    } catch (e) {
        throw new Error("Error in updateUser request: " + e)
    }
}
