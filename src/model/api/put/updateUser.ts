import bdClient from "@api/bdClient";
import getUser from "@api/get/getUser";
import getUserByEmail from "@api/get/getUserByEmail";
import getUserByUsername from "@api/get/getUserByUsername";
import { isEmpty } from "@helpers";
import { IBDUser } from "@interfaces";
import { Email, Hash, IBDPrimitive, UserId } from "@primitives";

export default async function updateUser(id: UserId, data: { username?: string, passwordHash?: Hash, email?: Email }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const username: string | undefined = data.username
        const passwordHash: Hash | undefined = data.passwordHash
        const email: Email | undefined = data.email

        if (username) {

            const userWithUsername: IBDUser | Error = await getUserByUsername(username)

            if (!(userWithUsername instanceof Error)) {
                return new Error(`User with such username(${username}) is already exists`)
            }
        }

        if (email) {
            const userWithEmail: IBDUser | Error = await getUserByEmail(email)

            if (!(userWithEmail instanceof Error)) {
                return new Error(`User with such email(${email}) is already exists`)
            }
        }

        const userWithId: IBDUser | Error = await getUser(id)

        if (userWithId instanceof Error) {
            return new Error(`User with such id(${id}) isn't exists`)
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

        bdClient.query(`update users set ${setString} where id = ${id} `)
    } catch (e) {
        throw new Error("Error in updateUser request: " + e)
    }
}
