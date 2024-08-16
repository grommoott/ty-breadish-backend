import { AvgRate, ItemId, ItemInfo, Price, ProductId } from "@primitives";
import { Item } from "./item";
import { IItem, IProduct, isItemIsProduct, isItemIsRecipe } from "@interfaces";
import updateProduct from "@api/put/updateProduct";
import deleteProduct from "@api/delete/deleteProduct";
import getProducts from "@api/get/getProducts";
import getProduct from "@api/get/getProduct";
import getItem from "@api/get/getItem";
import createProduct from "@api/post/createProduct";

class Product extends Item {

    // Private fields

    private _id: ProductId
    private _price: Price

    private static _products: Array<Product> | undefined

    // Getters

    public get id(): ProductId {
        return this._id
    }

    public get price(): Price {
        return this._price
    }

    // Methods

    public async edit(data: { price?: Price, name?: string, description?: string, itemInfo?: ItemInfo }): Promise<void | Error> {
        return await updateProduct(this._id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteProduct(this._id)
    }

    public toListView(): object {
        return {
            id: this.id.id,
            price: this.price.price,
            itemId: this.itemId.id,
            name: this.name,
            avgRate: this.avgRate.avgRate,
            itemInfo: this.itemInfo.toNormalView()
        }
    }

    // Static constructors

    public static async fromId(id: ProductId): Promise<Product | Error> {
        const product: IProduct | Error = await getProduct(id)

        if (product instanceof Error) {
            return product
        }

        return new Product(product)
    }

    public static override async fromItemId(id: ItemId): Promise<Product | Error> {
        const item: IItem | Error = await getItem(id)

        if (item instanceof Error) {
            return item
        }

        if (isItemIsRecipe(item)) {
            return new Error(`Item with this id(${id}) actually is a recipe, but not a product`)
        }

        return new Product(item as IProduct)
    }

    public static async getProducts(): Promise<Array<Product>> {
        if (!this._products) {
            const products: Array<IProduct> = await getProducts()

            this._products = products.map(product => new Product(product))
        }

        return this._products
    }

    public static async create(price: Price, name: string, description: string, itemInfo: ItemInfo): Promise<Product | Error> {
        const product: IProduct | Error = await createProduct(name, description, price, itemInfo)

        if (product instanceof Error) {
            return product
        }

        return new Product(product)
    }

    public override toNormalView(): object {
        return {
            id: this.id.id,
            price: this.price.price,
            itemId: this.itemId.id,
            name: this.name,
            description: this.description,
            avgRate: this.avgRate.avgRate,
            itemInfo: this.itemInfo.toNormalView()
        }
    }

    private constructor({ id, price, itemId, name, description, avgRate, itemInfo }: IProduct) {
        super({ itemId, name, description, avgRate, itemInfo })

        this._id = id
        this._price = price
    }
}

export { Product }
