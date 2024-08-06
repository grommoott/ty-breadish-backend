import "module-alias/register"

// Imports
import express from "express"
import cors from "cors"
import getUser from "@api/get/getUser"
import { UserId } from "@primitives"

// Basic fields declaration and initialization
const app = express()
const port = process.env.PORT || 8443

// Middleware connection
app.use(cors())

app.get("/", async (_, res) => {
    res.send(await getUser(new UserId(1)))
})

// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port)
})
