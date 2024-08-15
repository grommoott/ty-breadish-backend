import express, { Router } from "express"
import register from "./register"
import login from "./login"
import products from "./products"

const apiRouter: Router = express.Router()

apiRouter.post("/register", register.post)
apiRouter.post("/register/token", register.postToken)
apiRouter.post("/login", login.post)

apiRouter.get("/products/list", products.getList)

export { apiRouter }
