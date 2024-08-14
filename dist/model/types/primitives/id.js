"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionId = exports.OrderId = exports.ItemId = exports.MediaId = exports.UserId = exports.ReviewId = exports.RecipeId = exports.ProductId = exports.NewId = exports.LikeId = exports.FeaturedId = exports.CommentId = exports.Id = void 0;
class Id {
    _id;
    get id() {
        return this._id;
    }
    toString() {
        return this._id.toString();
    }
    toBDView() {
        return this._id.toString();
    }
    serialize() {
        return this._id.toString();
    }
    constructor(id) {
        if (typeof id === "string") {
            id = parseInt(id);
        }
        let isValid = true;
        isValid = isValid && Math.round(id) - id == 0;
        isValid = isValid && id >= 0;
        if (!isValid) {
            throw new Error(`Invalid id(${id})`);
        }
        this._id = id;
    }
}
exports.Id = Id;
class CommentId extends Id {
    _ = null;
}
exports.CommentId = CommentId;
class FeaturedId extends Id {
    _ = null;
}
exports.FeaturedId = FeaturedId;
class LikeId extends Id {
    _ = null;
}
exports.LikeId = LikeId;
class NewId extends Id {
    _ = null;
}
exports.NewId = NewId;
class ProductId extends Id {
    _ = null;
}
exports.ProductId = ProductId;
class RecipeId extends Id {
    _ = null;
}
exports.RecipeId = RecipeId;
class ReviewId extends Id {
    _ = null;
}
exports.ReviewId = ReviewId;
class UserId extends Id {
    _ = null;
}
exports.UserId = UserId;
class MediaId extends Id {
    _ = null;
}
exports.MediaId = MediaId;
class ItemId extends Id {
    _ = null;
}
exports.ItemId = ItemId;
class OrderId extends Id {
    _ = null;
}
exports.OrderId = OrderId;
class SessionId extends Id {
    _ = null;
}
exports.SessionId = SessionId;
