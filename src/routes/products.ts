import { Product } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { checkAdmin, checkAuthorized, checkBodyParams, checkParams, contentJson, Middleware } from "@middlewares"
import { ItemInfo, Price, ProductId } from "@primitives"
import path from "path"
import images from "./images"
import { ImageCategories } from "@enums"

class Products {
    public getList: Array<Middleware> = [
        contentJson,
        asyncErrorCatcher(async (_, res, next) => {
            const products: Array<Product> = await Product.getProducts()

            res.send(products.map(product => product.toListView()))

            next()
        })
    ]

    public get: Array<Middleware> = [
        checkParams(["id"]),
        contentJson,
        asyncErrorCatcher(async (req, res, next) => {
            const id: ProductId = new ProductId(req.params.id)

            const product: Product | Error = await Product.fromId(id)

            if (product instanceof Error) {
                next(product)
                return
            }

            res.send(product.toNormalView())

            next()
        })
    ]

    public postCreate: Array<Middleware> = [
        checkAdmin,
        checkBodyParams(["price", "name", "description", "itemInfo"]),
        asyncErrorCatcher(async (req, res, next) => {
            const price: Price = req.body.price
            const name: string = req.body.name
            const description: string = req.body.description
            const itemInfo: ItemInfo = req.body.itemInfo

            const product: Product | Error = await Product.create(price, name, description, itemInfo)

            if (product instanceof Error) {
                next(product)
                return
            }

            res.send(product.toNormalView())

            next()
        })
    ]

    public put: Array<Middleware> = [
        checkAdmin,
        checkBodyParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: ProductId = new ProductId(req.body.id)
            const price: Price | undefined = new Price(req.body.price)
            const name: string | undefined = req.body.name
            const description: string | undefined = req.body.description
            const itemInfo: ItemInfo | undefined = req.body.itemInfo

            const product: Product | Error = await Product.fromId(id)

            if (product instanceof Error) {
                next(product)
                return
            }

            const edit: void | Error = await product.edit({ price, name, description, itemInfo })

            if (edit instanceof Error) {
                next(edit)
                return
            }

            res.sendStatus(200)
        })
    ]

    public delete: Array<Middleware> = [
        checkAdmin,
        checkParams(["id"]),
        asyncErrorCatcher(async (req, res, next) => {
            const id: ProductId = new ProductId(req.params.id)

            const product: Product | Error = await Product.fromId(id)

            if (product instanceof Error) {
                next(product)
                return
            }

            const del: boolean | Error = await product.delete()

            if (del instanceof Error) {
                next(del)
                return
            }

            res.sendStatus(200)
        })
    ]

    public getImages: Array<Middleware> = images.get(ImageCategories.Products)

    public postImages: Array<Middleware> = [
        checkAdmin,
        ...images.postCreate(ImageCategories.Products)
    ]

    public deleteImages: Array<Middleware> = [
        checkAdmin,
        ...images.delete(ImageCategories.Products)
    ]

    public putImages: Array<Middleware> = [
        checkAdmin,
        ...images.put(ImageCategories.Products)
    ]
}

export default new Products()
