import "module-alias/register"

// Imports
import express from "express"
import cors from "cors"
import { apiRouter } from "@routes"
import { errorHandler } from "@middlewares"
import cookieParser from "cookie-parser"

// Basic fields declaration and initialization
const app = express()
const port = process.env.PORT || 8443

// Middleware connection
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api", apiRouter)

app.use(errorHandler)

// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port)
})
