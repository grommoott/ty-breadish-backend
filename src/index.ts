import "module-alias/register"

// Imports
import express from "express"
import cors from "cors"
import { UserId } from "@primitives"
import deleteUser from "@api/delete/deleteUser"

// Basic fields declaration and initialization
const app = express()
const port = process.env.PORT || 8443

// Middleware connection
app.use(cors())

app.get("/", async (_, res) => {
    res.send(await deleteUser(new UserId(1)))
})

// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port)
})
