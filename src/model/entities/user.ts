import getUserByUsername from "@api/get/getUserByUsername";
import getUserRole from "@api/get/getUserRole";
import updateUser from "@api/put/updateUser";
import { ItemType, LikeType, OrderType, Role, Rate } from "@enums";
import { IFeatured, ILike, IUser } from "@interfaces";
import { Email, Hash, Id, ItemId, MediaId, Moment, ProductId, UserId } from "@primitives";
import { Comment } from "./comment";
import getUser from "@api/get/getUser";
import { Review } from "./review";
import deleteUser from "@api/delete/deleteUser";
import createUser from "@api/post/createUser";
import { Like } from "./like";
import { Featured } from "./featured";
import { OrderInfo } from "model/types/primitives/orderInfo";
import { Order } from "./order";
import { Entity } from "./entity";
import getUserByEmail from "@api/get/getUserByEmail";

class User extends Entity {

    // Private field

    private _user: IUser
    private _role: Role | undefined
    private _liked: Array<Like> | undefined
    private _featured: Array<Featured> | undefined
    private _orders: Array<Order> | undefined

    // Getters

    public get id(): UserId {
        return this._user.id
    }

    public get username(): string {
        return this._user.username
    }

    public get email(): Email {
        return this._user.email
    }

    public get moment(): Moment {
        return this._user.moment
    }

    // Methods

    public async getRole(): Promise<Role | Error> {
        if (!this._role) {
            const role: Role | Error = await getUserRole(this._user.id)

            if (role instanceof Error) {
                return role
            }

            this._role = role
        }

        return this._role
    }

    public async getLiked(): Promise<Array<ILike> | Error> {
        if (!this._liked) {
            const liked: Array<Like> | Error = await Like.fromUser(this._user.id)

            if (liked instanceof Error) {
                return liked
            }

            this._liked = liked
        }

        return this._liked
    }

    public async getFeatured(): Promise<Array<IFeatured> | Error> {
        if (!this._featured) {
            const featured: Array<Featured> | Error = await Featured.fromUser(this._user.id)

            if (featured instanceof Error) {
                return featured
            }

            this._featured = featured
        }

        return this._featured
    }

    public async getOrders(): Promise<Array<Order> | Error> {
        if (!this._orders) {
            const orders: Array<Order> | Error = await Order.fromUser(this._user.id)

            if (orders instanceof Error) {
                return orders
            }

            this._orders = orders
        }

        return this._orders
    }

    public async isPasswordIsValid(password: string): Promise<boolean> {
        return await this._user.passwordHash.compare(password)
    }

    public async createComment(target: MediaId, content: string): Promise<Comment | Error> {
        const comment: Comment | Error = await Comment.create(this._user.id, target, content)

        return comment
    }

    public async createReview(target: ItemId, content: string, rate: Rate): Promise<Review | Error> {
        const review: Review | Error = await Review.create(this._user.id, target, content, rate)

        return review
    }

    public async createLike(target: Id, type: LikeType): Promise<Like | Error> {
        const like: Like | Error = await Like.create(this._user.id, target, type)

        if (like instanceof Error) {
            return like
        }

        this._liked?.push(like)

        return like
    }

    public async createFeatured(target: ItemId, itemType: ItemType): Promise<Featured | Error> {
        const featured: Featured | Error = await Featured.create(this._user.id, target, itemType)

        if (featured instanceof Error) {
            return featured
        }

        this._featured?.push(featured)

        return featured
    }

    public async createOrder(paymentId: string, orderType: OrderType, orderInfo: OrderInfo, productIds: Array<ProductId>): Promise<Order | Error> {
        const order: Order | Error = await Order.create({ from: this._user.id, paymentId, orderType, orderInfo, productIds })

        return order
    }

    public async edit(data: { username?: string, passwordHash?: Hash, email?: Email }): Promise<void | Error> {
        return await updateUser(this._user.id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteUser(this._user.id)
    }

    // Static constructors

    public static async fromUsername(username: string): Promise<User | Error> {
        const user: IUser | Error = await getUserByUsername(username)

        if (user instanceof Error) {
            return user
        }

        return new User(user)
    }

    public static async fromEmail(email: Email): Promise<User | Error> {
        const user: IUser | Error = await getUserByEmail(email)

        if (user instanceof Error) {
            return user
        }

        return new User(user)
    }

    public static async fromId(id: UserId): Promise<User | Error> {
        const user: IUser | Error = await getUser(id)

        if (user instanceof Error) {
            return user
        }

        return new User(user)
    }

    public static async create(username: string, passwordHash: Hash, email: Email): Promise<User | Error> {
        const user: IUser | Error = await createUser(username, passwordHash, email)

        if (user instanceof Error) {
            return user
        }

        return new User(user)
    }

    public override toNormalView({ role }: { role: Role }): object {
        return {
            id: this._user.id.id,
            username: this._user.username,
            email: this._user.email.email,
            moment: this._user.moment.moment,
            role: role
        }
    }

    private constructor({ id, username, passwordHash, email, moment }: IUser) {
        super()

        this._user = { id, username, passwordHash, email, moment }
    }
}

export { User }
