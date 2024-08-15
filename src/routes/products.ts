import { Product } from "@entities"
import { asyncErrorCatcher } from "@helpers"
import { checkAdmin, contentJson, Middleware } from "@middlewares"

class Products {
    public getList: Array<Middleware> = [
        checkAdmin,
        contentJson,
        asyncErrorCatcher(async (_, res, next) => {
            const products: Array<Product> = await Product.getProducts()

            res.send(products.map(product => {
                return {
                    id: product.id.id,
                    price: product.price.price,
                    itemId: product.itemId.id,
                    name: product.name,
                    avgRate: product.avgRate.avgRate,
                    itemInfo: product.itemInfo
                }
            }))

            next()
        })
    ]
}

export default new Products()
