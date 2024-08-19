import bdClient from "@api/bdClient";
import { ImageCategory } from "@enums";
import { ImageId } from "@primitives";
import { QueryResult } from "pg";
import fs from "fs/promises"
import path from "path";
import { IImage } from "@interfaces";
import getImage from "@api/get/getImage";
import { pgFormat } from "@helpers";

export default async function deleteImage(id: ImageId, category: ImageCategory): Promise<boolean | Error> {
    try {
        const image: IImage | Error = await getImage(id, category)

        if (image instanceof Error) {
            return image
        }

        await fs.rm(path.join(__dirname, `../../../../data/images/${category}/${id}.${image.extension}`))

        const response: QueryResult = await bdClient.query(`delete from images where id=${id} and category='${pgFormat(category)}'`)

        return response.rowCount != 0
    } catch (e) {
        const msg = "Error in deleteImage request: " + e
        return new Error(msg, { cause: 500 })
    }
}
