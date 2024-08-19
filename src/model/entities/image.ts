import bdClient from "@api/bdClient"
import deleteImage from "@api/delete/deleteImage"
import getImage from "@api/get/getImage"
import createImage from "@api/post/createImage"
import updateImage from "@api/put/updateImage"
import { ImageCategory } from "@enums"
import { IImage } from "@interfaces"
import { ImageId } from "@primitives"

class Image {

    // Private fields

    private _image: IImage

    // Getters

    public get id(): ImageId {
        return this._image.id
    }

    public get category(): ImageCategory {
        return this._image.category
    }

    public get extension(): string {
        return this._image.extension
    }

    // Methods

    public async edit({ extension }: { extension?: string }): Promise<void | Error> {
        return await updateImage(this._image.id, this._image.category, { extension })
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteImage(this._image.id, this._image.category)
    }

    // Static constructors

    public static async fromIdCategory(id: ImageId, category: ImageCategory): Promise<Image | Error> {
        const image: IImage | Error = await getImage(id, category)

        if (image instanceof Error) {
            return image
        }

        return new Image(image)
    }

    public static async create(id: ImageId, category: ImageCategory, extension: string): Promise<Image | Error> {
        const image: IImage | Error = await createImage(id, category, extension)

        if (image instanceof Error) {
            return image
        }

        return new Image(image)
    }

    private constructor({ id, category, extension }: IImage) {
        this._image = { id, category, extension }
    }

}

export { Image }
