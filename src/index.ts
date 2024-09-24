import "module-alias/register"

// Imports
import express from "express"
import cors from "cors"
import { apiRouter } from "@routes"
import { errorHandler } from "@middlewares"
import cookieParser from "cookie-parser"
import { Payment, yookassaApi } from "@helpers/yookassa"
import { Price } from "@primitives"

// Basic fields declaration and initialization
const app = express()
const port = process.env.PORT || 8443

// Middleware connection
app.use(cors({ credentials: true, origin: ["http://localhost:5173", "http://localhost:4173"] }))
app.use(express.json())
app.use(cookieParser())

app.use("/api", apiRouter)

app.get("/", async (req, res) => {
    const payment: Payment | Error = await yookassaApi.createPayment(new Price(100), "OK", "https://example.com")

    if (payment instanceof Error) {
        res.send("Error")
        return
    }

    res.send(payment)
    return
})

app.use(errorHandler)

// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port)
})
