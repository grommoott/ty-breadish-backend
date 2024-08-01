// Imports
import express from "express"
import cors from "cors"

// Basic fields declaration and initialization
const app = express()
const port = process.env.PORT || 8443

// Middleware connection
app.use(cors())

// Starting server
app.listen(port, () => {
    console.log("Server was succesfully started on port " + port)
})
