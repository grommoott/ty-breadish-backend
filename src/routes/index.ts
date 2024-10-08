import express, { Router } from "express"
import register from "./register"
import login from "./login"
import products from "./products"
import accessToken from "./accessToken"
import comments from "./comments"
import news from "./news"
import likes from "./likes"
import featured from "./featured"
import reviews from "./reviews"
import orders from "./orders"
import verificaitonCode from "./verificationCode"
import users from "./users"
import yookassaWebhook from "./yookassaWebhook"
import recipes from "./recipes"
import images from "./images"
import { ImageCategories } from "@enums"
import { checkAdmin } from "@middlewares"

const apiRouter: Router = express.Router()

// Authorization & Authentication

apiRouter.post("/register", register.post)
apiRouter.post("/register/token", register.postToken)

apiRouter.post("/login", login.post)

apiRouter.get("/accessToken", accessToken.get)

apiRouter.post("/verificationCode/create", verificaitonCode.postCreate)

// Items

apiRouter.get("/products/id/:id", products.get)
apiRouter.get("/products/list", products.getList)
apiRouter.post("/products/create", products.postCreate)
apiRouter.delete("/products/id/:id", products.delete)
apiRouter.put("/products", products.put)
apiRouter.get("/products/images/id/:id", products.getImages)
apiRouter.post("/products/images/create", products.postImages)
apiRouter.delete("/products/images/id/:id", products.deleteImages)
apiRouter.put("/products/images", products.putImages)

apiRouter.get("/recipes/id/:id", recipes.get)
apiRouter.get("/recipes/list", recipes.getList)
apiRouter.post("/recipes/create", recipes.postCreate)
apiRouter.delete("/recipes/id/:id", recipes.delete)
apiRouter.put("/recipes", recipes.put)
apiRouter.get("/recipes/images/id/:id", recipes.getImages)
apiRouter.post("/recipes/images/create", recipes.postImages)
apiRouter.delete("/recipes/images/id/:id", recipes.deleteImages)
apiRouter.put("/recipes/images", recipes.putImages)

apiRouter.get("/featured", featured.get)
apiRouter.post("/featured/create", featured.postCreate)
apiRouter.delete("/featured/id/:id", featured.delete)

apiRouter.get("/reviews/target/:target/sortOrder/:sortOrder/page/:page", reviews.getPage)
apiRouter.post("/reviews/create", reviews.postCreate)
apiRouter.delete("/reviews/id/:id", reviews.delete)
apiRouter.put("/reviews", reviews.put)

// Media

apiRouter.get("/comments/target/:target/sortOrder/:sortOrder/page/:page", comments.getPage)
apiRouter.get("/comments/count/target/:target", comments.getCount)
apiRouter.post("/comments/create", comments.postCreate)
apiRouter.delete("/comments/id/:id", comments.delete)
apiRouter.put("/comments", comments.put)

apiRouter.get("/news/page/:page", news.getPage)
apiRouter.get("/news/id/:id", news.get)
apiRouter.post("/news/create", news.postCreate)
apiRouter.delete("/news/id/:id", news.delete)
apiRouter.put("/news", news.put)
apiRouter.get("/news/images/id/:id", news.getImages)
apiRouter.post("/news/images/create", news.postImages)
apiRouter.delete("/news/images/id/:id", news.deleteImages)
apiRouter.put("/news/images", news.putImages)

apiRouter.get("/likes", likes.get)
apiRouter.get("/likes/count/target/:target/type/:type", likes.getCount)
apiRouter.post("/likes/create", likes.postCreate)
apiRouter.delete("/likes/id/:id", likes.delete)

// Order

apiRouter.get("/orders", orders.get)
apiRouter.post("/orders/create", orders.postCreate)
apiRouter.delete("/orders/id/:id", orders.delete)

apiRouter.post("/yookassaWebhook", yookassaWebhook.post)

// User

apiRouter.get("/users/usernameAvailable/:username", users.getUsernameAvailable)
apiRouter.get("/users/emailAvailable/:email", users.getEmailAvailable)
apiRouter.get("/users/isPasswordIsValid/:password", users.getIsPasswordIsValid)
apiRouter.get("/users/username/id/:id", users.getUsername)
apiRouter.get("/users", users.get)
apiRouter.delete("/users/verificationCode/:verificationCode/password/:password", users.delete)
apiRouter.put("/users", users.put)
apiRouter.get("/users/avatars/id/:id", users.getAvatars)
apiRouter.post("/users/avatars/create", users.postAvatars)
apiRouter.delete("/users/avatars", users.deleteAvatars)
apiRouter.put("/users/avatars", users.putAvatars)

// images

apiRouter.get("/images/id/:id", images.get(ImageCategories.Images))
apiRouter.post("/images/create", images.postCreateBasic)
apiRouter.delete("/images/id/:id", [checkAdmin, ...images.delete(ImageCategories.Images)])
apiRouter.put("/images", [checkAdmin, ...images.put(ImageCategories.Images)])

export { apiRouter }
