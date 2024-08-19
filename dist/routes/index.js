"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
const products_1 = __importDefault(require("./products"));
const accessToken_1 = __importDefault(require("./accessToken"));
const comments_1 = __importDefault(require("./comments"));
const news_1 = __importDefault(require("./news"));
const likes_1 = __importDefault(require("./likes"));
const featured_1 = __importDefault(require("./featured"));
const reviews_1 = __importDefault(require("./reviews"));
const orders_1 = __importDefault(require("./orders"));
const verificationCode_1 = __importDefault(require("./verificationCode"));
const users_1 = __importDefault(require("./users"));
const yookassaWebhook_1 = __importDefault(require("./yookassaWebhook"));
const recipies_1 = __importDefault(require("./recipies"));
const apiRouter = express_1.default.Router();
exports.apiRouter = apiRouter;
// Authorization & Authentication
apiRouter.post("/register", register_1.default.post);
apiRouter.post("/register/token", register_1.default.postToken);
apiRouter.post("/login", login_1.default.post);
apiRouter.get("/accessToken", accessToken_1.default.get);
apiRouter.post("/verificationCode/create", verificationCode_1.default.postCreate);
// Items
apiRouter.get("/products/id/:id", products_1.default.get);
apiRouter.get("/products/list", products_1.default.getList);
apiRouter.post("/products/create", products_1.default.postCreate);
apiRouter.delete("/products/id/:id", products_1.default.delete);
apiRouter.put("/products", products_1.default.put);
apiRouter.get("/products/images/id/:id", products_1.default.getImages);
apiRouter.post("/products/images", products_1.default.postImages);
apiRouter.delete("/products/images/id/:id", products_1.default.deleteImages);
apiRouter.put("/products/images", products_1.default.putImages);
apiRouter.get("/recipies/id/:id", recipies_1.default.get);
apiRouter.get("/recipies/list", recipies_1.default.getList);
apiRouter.post("/recipies/create", recipies_1.default.postCreate);
apiRouter.delete("/recipies/id/:id", recipies_1.default.delete);
apiRouter.put("/recipies", recipies_1.default.put);
apiRouter.get("/recipies/images/id/:id", recipies_1.default.getImages);
apiRouter.post("/recipies/images", recipies_1.default.postImages);
apiRouter.delete("/recipies/images/id/:id", recipies_1.default.deleteImages);
apiRouter.put("/recipies/images", recipies_1.default.putImages);
apiRouter.get("/featured", featured_1.default.get);
apiRouter.post("/featured/create", featured_1.default.postCreate);
apiRouter.delete("/featured/id/:id", featured_1.default.delete);
apiRouter.get("/reviews/target/:target/sortOrder/:sortOrder/page/:page", reviews_1.default.getPage);
apiRouter.post("/reviews/create", reviews_1.default.postCreate);
apiRouter.delete("/reviews/id/:id", reviews_1.default.delete);
apiRouter.put("/reviews", reviews_1.default.put);
// Media
apiRouter.post("/comments/create", comments_1.default.postCreate);
apiRouter.get("/comments/target/:target/sortOrder/:sortOrder/page/:page", comments_1.default.get);
apiRouter.delete("/comments/id/:id", comments_1.default.delete);
apiRouter.put("/comments", comments_1.default.put);
apiRouter.get("/news/page/:page", news_1.default.getPage);
apiRouter.get("/news/id/:id", news_1.default.get);
apiRouter.post("/news/create", news_1.default.postCreate);
apiRouter.put("/news", news_1.default.put);
apiRouter.delete("/news/id/:id", news_1.default.delete);
apiRouter.get("/news/images/id/:id", news_1.default.getImages);
apiRouter.post("/news/images", news_1.default.postImages);
apiRouter.delete("/news/images/id/:id", news_1.default.deleteImages);
apiRouter.put("/news/images", news_1.default.putImages);
apiRouter.get("/likes", likes_1.default.get);
apiRouter.post("/likes/create", likes_1.default.postCreate);
apiRouter.delete("/likes/id/:id", likes_1.default.delete);
// Order
apiRouter.get("/orders", orders_1.default.get);
apiRouter.post("/orders/create", orders_1.default.postCreate);
apiRouter.delete("/orders/delete", orders_1.default.delete);
apiRouter.post("/yookassaWebhook", yookassaWebhook_1.default.post);
// User
apiRouter.get("/users/usernameAvailable/:username", users_1.default.getUsernameAvailable);
apiRouter.get("/users/emailAvailable/:email", users_1.default.getEmailAvailable);
apiRouter.delete("/users/verificationCode/:verificationCode/password/:password", users_1.default.delete);
apiRouter.put("/users", users_1.default.put);
apiRouter.get("/users/avatars/id/:id", users_1.default.getAvatars);
apiRouter.post("/users/avatars", users_1.default.postAvatars);
apiRouter.delete("/users/avatars/id/:id", users_1.default.deleteAvatars);
apiRouter.put("/users/avatars", users_1.default.putAvatars);
