"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const getUserByUsername_1 = __importDefault(require("@api/get/getUserByUsername"));
const getUserRole_1 = __importDefault(require("@api/get/getUserRole"));
const updateUser_1 = __importDefault(require("@api/put/updateUser"));
const comment_1 = require("./comment");
const getUser_1 = __importDefault(require("@api/get/getUser"));
const review_1 = require("./review");
const deleteUser_1 = __importDefault(require("@api/delete/deleteUser"));
const createUser_1 = __importDefault(require("@api/post/createUser"));
const like_1 = require("./like");
const featured_1 = require("./featured");
const order_1 = require("./order");
const entity_1 = require("./entity");
class User extends entity_1.Entity {
    // Private field
    _user;
    _role;
    _liked;
    _featured;
    // Getters
    get id() {
        return this._user.id;
    }
    get username() {
        return this._user.username;
    }
    get email() {
        return this._user.email;
    }
    get moment() {
        return this._user.moment;
    }
    // Methods
    async getRole() {
        if (!this._role) {
            const role = await (0, getUserRole_1.default)(this._user.id);
            if (role instanceof Error) {
                return role;
            }
            this._role = role;
        }
        return this._role;
    }
    async getLiked() {
        if (!this._liked) {
            const liked = await like_1.Like.fromUser(this._user.id);
            if (liked instanceof Error) {
                return liked;
            }
            this._liked = liked;
        }
        return this._liked;
    }
    async getFeatured() {
        if (!this._featured) {
            const featured = await featured_1.Featured.fromUser(this._user.id);
            if (featured instanceof Error) {
                return featured;
            }
            this._featured = featured;
        }
        return this._featured;
    }
    async createComment(target, content) {
        const comment = await comment_1.Comment.create(this._user.id, target, content);
        return comment;
    }
    async createReview(target, content, rate) {
        const review = await review_1.Review.create(this._user.id, target, content, rate);
        return review;
    }
    async createLike(target, type) {
        const like = await like_1.Like.create(this._user.id, target, type);
        if (like instanceof Error) {
            return like;
        }
        this._liked?.push(like);
        return like;
    }
    async createFeatured(target, itemType) {
        const featured = await featured_1.Featured.create(this._user.id, target, itemType);
        if (featured instanceof Error) {
            return featured;
        }
        this._featured?.push(featured);
        return featured;
    }
    async createOrder(orderType, orderInfo, productIds) {
        const order = await order_1.Order.create({ from: this._user.id, orderType, orderInfo, productIds });
        return order;
    }
    async edit(data) {
        return await (0, updateUser_1.default)(this._user.id, data);
    }
    async delete() {
        return await (0, deleteUser_1.default)(this._user.id);
    }
    // Static constructors
    static async fromAuth(username, password) {
        const user = await (0, getUserByUsername_1.default)(username);
        if (user instanceof Error) {
            return new Error(`User with such username(${username}) isn't exists`);
        }
        if (!(await user.passwordHash.compare(password))) {
            return new Error(`Invalid password`);
        }
        return new User(user);
    }
    static async fromUsername(username) {
        const user = await (0, getUserByUsername_1.default)(username);
        if (user instanceof Error) {
            return user;
        }
        return new User(user);
    }
    static async fromId(id) {
        const user = await (0, getUser_1.default)(id);
        if (user instanceof Error) {
            return user;
        }
        return new User(user);
    }
    static async create(username, passwordHash, email) {
        const user = await (0, createUser_1.default)(username, passwordHash, email);
        if (user instanceof Error) {
            return user;
        }
        return new User(user);
    }
    toNormalView() {
        return {
            id: this._user.id.id,
            username: this._user.username,
            email: this._user.email.email,
            moment: this._user.moment.moment
        };
    }
    constructor({ id, username, passwordHash, email, moment }) {
        super();
        this._user = { id, username, passwordHash, email, moment };
    }
}
exports.User = User;
