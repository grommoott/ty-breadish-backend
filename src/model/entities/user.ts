import getUserByUsername from "@api/get/getUserByUsername";
import getUserFeatured from "@api/get/getUserFeatured";
import getUserLiked from "@api/get/getUserLiked";
import getUserRole from "@api/get/getUserRole";
import updateUser from "@api/put/updateUser";
import { Role } from "@enums";
import { IComment, IFeatured, ILike, IUser } from "@interfaces";
import { Email, Hash, ItemId, MediaId, Moment, Rate, UserId } from "@primitives";
import { Comment } from "./comment";
import getUser from "@api/get/getUser";
import createComment from "@api/post/createComment";
import { Review } from "./review";
import deleteUser from "@api/delete/deleteUser";
import createReview from "@api/post/createReview";

class User {

    // Private field

    private _user: IUser
    private _role: Role | undefined
    private _liked: Array<ILike> | undefined
    private _featured: Array<IFeatured> | undefined

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
            const liked: Array<ILike> | Error = await getUserLiked(this._user.id)

            if (liked instanceof Error) {
                return liked
            }

            this._liked = liked
        }

        return this._liked
    }

    public async getFeatured(): Promise<Array<IFeatured> | Error> {
        if (!this._featured) {
            const featured: Array<IFeatured> | Error = await getUserFeatured(this._user.id)

            if (featured instanceof Error) {
                return featured
            }

            this._featured = featured
        }

        return this._featured
    }

    public async createComment(target: MediaId, content: string): Promise<Comment | Error> {
        const comment: Comment | Error = await Comment.create(this._user.id, target, content)

        if (comment instanceof Error) {
            return comment
        }

        return comment
    }

    public async createReview(target: ItemId, content: string, rate: Rate): Promise<Review | Error> {
        const review: Review | Error = await Review.create(this._user.id, target, content, rate)

        if (review instanceof Error) {
            return review
        }

        return review
    }

    public async edit(data: { username?: string, passwordHash?: Hash, email?: Email }): Promise<void | Error> {
        return await updateUser(this._user.id, data)
    }

    public async delete(): Promise<boolean | Error> {
        return await deleteUser(this._user.id)
    }

    // Static constructors

    public static async fromAuth(username: string, password: string): Promise<User | Error> {
        const user: IUser | Error = await getUserByUsername(username)

        if (user instanceof Error) {
            return new Error(`User with such username(${username}) isn't exists`)
        }

        if (await user.passwordHash.compare(password)) {
            return new Error(`Invalid password`)
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

    private constructor({ id, username, passwordHash, email, moment }: IUser) {
        this._user = { id, username, passwordHash, email, moment }
    }
}

export { User }
