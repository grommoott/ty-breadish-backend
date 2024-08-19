import bdClient from "@api/bdClient";
import getImage from "@api/get/getImage";
import { ImageCategory } from "@enums";
import { isEmpty, pgFormat } from "@helpers";
import { IImage } from "@interfaces";
import { ImageId } from "@primitives";

export default async function updateImage(id: ImageId, category: ImageCategory, data: { extension?: string }): Promise<void | Error> {
    try {
        if (isEmpty(data)) {
            return new Error("There is nothing to do")
        }

        const image: IImage | Error = await getImage(id, category)

        if (image instanceof Error) {
            return image
        }

        await bdClient.query(`update images set extension='${pgFormat(data.extension)}' where id=${id} and category='${pgFormat(category)}'`)
    } catch (e) {
        const msg = "Error in updateImage request: " + e
        return new Error(msg, { cause: 500 })
    }
}
