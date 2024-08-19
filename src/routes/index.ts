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
import recipies from "./recipies"

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
apiRouter.post("/products/images", products.postImages)
apiRouter.delete("/products/images/id/:id", products.deleteImages)
apiRouter.put("/products/images", products.putImages)

apiRouter.get("/recipies/id/:id", recipies.get)
apiRouter.get("/recipies/list", recipies.getList)
apiRouter.post("/recipies/create", recipies.postCreate)
apiRouter.delete("/recipies/id/:id", recipies.delete)
apiRouter.put("/recipies", recipies.put)
apiRouter.get("/recipies/images/id/:id", recipies.getImages)
apiRouter.post("/recipies/images", recipies.postImages)
apiRouter.delete("/recipies/images/id/:id", recipies.deleteImages)
apiRouter.put("/recipies/images", recipies.putImages)

apiRouter.get("/featured", featured.get)
apiRouter.post("/featured/create", featured.postCreate)
apiRouter.delete("/featured/id/:id", featured.delete)

apiRouter.get("/reviews/target/:target/sortOrder/:sortOrder/page/:page", reviews.getPage)
apiRouter.post("/reviews/create", reviews.postCreate)
apiRouter.delete("/reviews/id/:id", reviews.delete)
apiRouter.put("/reviews", reviews.put)

// Media

apiRouter.post("/comments/create", comments.postCreate)
apiRouter.get("/comments/target/:target/sortOrder/:sortOrder/page/:page", comments.get)
apiRouter.delete("/comments/id/:id", comments.delete)
apiRouter.put("/comments", comments.put)

apiRouter.get("/news/page/:page", news.getPage)
apiRouter.get("/news/id/:id", news.get)
apiRouter.post("/news/create", news.postCreate)
apiRouter.put("/news", news.put)
apiRouter.delete("/news/id/:id", news.delete)
apiRouter.get("/news/images/id/:id", news.getImages)
apiRouter.post("/news/images", news.postImages)
apiRouter.delete("/news/images/id/:id", news.deleteImages)
apiRouter.put("/news/images", news.putImages)

apiRouter.get("/likes", likes.get)
apiRouter.post("/likes/create", likes.postCreate)
apiRouter.delete("/likes/id/:id", likes.delete)

// Order

apiRouter.get("/orders", orders.get)
apiRouter.post("/orders/create", orders.postCreate)
apiRouter.delete("/orders/delete", orders.delete)

apiRouter.post("/yookassaWebhook", yookassaWebhook.post)

// User

apiRouter.get("/users/usernameAvailable/:username", users.getUsernameAvailable)
apiRouter.get("/users/emailAvailable/:email", users.getEmailAvailable)
apiRouter.delete("/users/verificationCode/:verificationCode/password/:password", users.delete)
apiRouter.put("/users", users.put)
apiRouter.get("/users/avatars/id/:id", users.getAvatars)
apiRouter.post("/users/avatars", users.postAvatars)
apiRouter.delete("/users/avatars/id/:id", users.deleteAvatars)
apiRouter.put("/users/avatars", users.putAvatars)

export { apiRouter }
