import "module-alias/register"

// Imports
import express from "express"
import cors from "cors"
import getUser from "@api/get/getUser"
import { MediaId, UserId } from "@primitives"
import getNewsPagesCount from "@api/get/getNewsPagesCount"
import getNewsPage from "@api/get/getNewsPage"
import createLike from "@api/post/createLike"
import { LikeTypes } from "@enums"

// Basic fields declaration and initialization
const app = express()
const port = process.env.PORT || 8443

// Middleware connection
app.use(cors())

app.get("/", async (_, res) => {
    res.send(await createLike(new UserId(0), new MediaId(0), LikeTypes.Media))
})

// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port)
})
