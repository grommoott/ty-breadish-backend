import express, { Router } from "express"
import register from "./register"
import login from "./login"
import products from "./products"
import accessToken from "./accessToken"
import comments from "./comments"
import recipes from "./recipes"
import news from "./news"
import likes from "./likes"
import featured from "./featured"
import reviews from "./reviews"
import orders from "./orders"
import verificaitonCode from "./verificationCode"

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

apiRouter.get("/recipes/id/:id", recipes.get)
apiRouter.get("/recipes/list", recipes.getList)
apiRouter.post("/recipes/create", recipes.postCreate)
apiRouter.delete("/recipes/id/:id", recipes.delete)
apiRouter.put("/recipes", recipes.put)
apiRouter.get("/recipes/images/id/:id", recipes.getImages)

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

apiRouter.get("/likes", likes.get)
apiRouter.post("/likes/create", likes.postCreate)
apiRouter.delete("/likes/id/:id", likes.delete)

// Order

apiRouter.get("/orders", orders.get)

export { apiRouter }