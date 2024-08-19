import { ImageCategory } from "@enums";
import { ImageId } from "@primitives";

interface IImage {
    id: ImageId,
    category: ImageCategory,
    extension: string
}

function queryRowToImage(row: any): IImage {
    if (!("id" in row && "category" in row && "extension" in row)) {
        throw new Error("Invalid query row to convert into IImage")
    }

    return {
        id: row.id,
        category: row.category,
        extension: row.extension
    }
}

export { IImage, queryRowToImage }
