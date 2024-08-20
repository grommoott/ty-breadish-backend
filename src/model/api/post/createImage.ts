import bdClient from "@api/bdClient";
import getImage from "@api/get/getImage";
import { ImageCategories, ImageCategory } from "@enums";
import { pgFormat } from "@helpers";
import { IImage, queryRowToImage } from "@interfaces";
import { ImageId } from "@primitives";
import { QueryResult } from "pg";

export default async function createImage(id: ImageId, category: ImageCategory, extension: string): Promise<IImage | Error> {
    try {
        if (category === ImageCategories.Images) {
            return new Error("To create basic image use createBasicImage request")
        }

        const imageWithIdCategory: IImage | Error = await getImage(id, category)

        if (!(imageWithIdCategory instanceof Error)) {
            return new Error(`Image with such id(${id}) in category ${category} is already exists`)
        }

        const response: QueryResult = await bdClient.query(`insert into images values (${id}, '${pgFormat(category)}', '${pgFormat(extension)}') returning *`)

        return queryRowToImage(response.rows[0])
    } catch (e) {
        const msg = "Error in createImage request: " + e
        return new Error(msg, { cause: 500 })
    }
}
