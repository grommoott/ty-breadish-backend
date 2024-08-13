import bdClient from "@api/bdClient";
import { getSession } from "@api/get/getSession";
import { isEmpty } from "@helpers";
import { ISession } from "@interfaces";
import { Moment, SessionId } from "@primitives";

export default async function updateSession(id: SessionId, data: { refreshTokenId?: string, moment?: Moment }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const sessionWithId: ISession | Error = await getSession(id)

        if (sessionWithId instanceof Error) {
            return sessionWithId
        }

        const nameConverter: (name: string) => string = (name: string): string => {
            switch (name) {
                case "refreshTokenId":
                    return "refresh_token_id"

                default:
                    return name
            }
        }

        const valueConverter: (key: string, val: any) => string = (key: string, val: any): string => {
            switch (key) {
                case "refreshTokenId":
                    return `'${val}'`

                case "moment":
                    return `${val}`

                default:
                    return `${val}`
            }
        }

        const setString = Object.entries(data).map(([key, val]) => {
            return `${nameConverter(key)}=${valueConverter(key, val)}`
        }).join(", ")

        await bdClient.query(`update sessions set ${setString} where id=${id}`)
    } catch (e) {
        const msg = "Error in updateSession request: " + e
        throw new Error(msg, { cause: 500 })
    }
}
