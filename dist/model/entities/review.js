"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const deleteReview_1 = __importDefault(require("@api/delete/deleteReview"));
const getReview_1 = __importDefault(require("@api/get/getReview"));
const getReviewsPage_1 = __importDefault(require("@api/get/getReviewsPage"));
const createReview_1 = __importDefault(require("@api/post/createReview"));
const updateReview_1 = __importDefault(require("@api/put/updateReview"));
const entity_1 = require("./entity");
class Review extends entity_1.Entity {
    // Private fields
    _review;
    // Getters
    get id() {
        return this._review.id;
    }
    get from() {
        return this._review.from;
    }
    get target() {
        return this._review.target;
    }
    get content() {
        return this._review.content;
    }
    get moment() {
        return this._review.moment;
    }
    get rate() {
        return this._review.rate;
    }
    // Methods
    async edit(data) {
        return await (0, updateReview_1.default)(this._review.id, data);
    }
    async delete() {
        return await (0, deleteReview_1.default)(this._review.id);
    }
    // Static constructors
    static async getReviewsPage(itemId, sortOrder, page) {
        const reviews = await (0, getReviewsPage_1.default)(itemId, sortOrder, page);
        if (reviews instanceof Error) {
            return reviews;
        }
        return reviews.map(review => new Review(review));
    }
    static async fromId(id) {
        const review = await (0, getReview_1.default)(id);
        if (review instanceof Error) {
            return review;
        }
        return new Review(review);
    }
    static async create(from, target, content, rate) {
        const review = await (0, createReview_1.default)(from, target, content, rate);
        if (review instanceof Error) {
            return review;
        }
        return new Review(review);
    }
    toNormalView() {
        return {
            id: this._review.id.id,
            from: this._review.from.id,
            target: this._review.target.id,
            content: this._review.content,
            moment: this._review.moment.moment,
            rate: this._review.rate
        };
    }
    constructor({ id, from, target, content, moment, rate }) {
        super();
        this._review = { id, from, target, content, moment, rate };
    }
}
exports.Review = Review;
