import "module-alias/register"

// Imports
import express from "express"
import cors from "cors"
import { ReviewId, UserId } from "@primitives"
import updateReview from "@api/put/updateReview"
import jwt from "@helpers/jwt"
import { isEmpty } from "@helpers"

// Basic fields declaration and initialization
const app = express()
const port = process.env.PORT || 8443

// Middleware connection
app.use(cors())

app.use((req, res, next) => {

})

console.log(jwt.createAccessToken(new UserId(0)))

app.get("/", async (_, res) => {
    res.sendStatus(200)
})

// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port)
})
