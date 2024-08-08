import "module-alias/register"

// Imports
import express from "express"
import cors from "cors"
import { ReviewId } from "@primitives"
import updateReview from "@api/put/updateReview"

// Basic fields declaration and initialization
const app = express()
const port = process.env.PORT || 8443

// Middleware connection
app.use(cors())

updateReview(new ReviewId(3), { content: "Так себе если честно(", rate: 2 })

app.get("/", async (_, res) => {
    res.sendStatus(200)
})

// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port)
})
