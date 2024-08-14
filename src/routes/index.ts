import express, { Router } from "express"
import register from "./register"

const apiRouter: Router = express.Router()

apiRouter.post("/register", register.post)

export { apiRouter }
