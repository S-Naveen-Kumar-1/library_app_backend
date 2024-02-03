const express = require("express")
const app = express()
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { bookRouter } = require("./routes/books.routes")
app.use(express.json())
app.use(cors())
app.use("/", userRouter)
app.use("/books", bookRouter)

require('dotenv').config()
const port = process.env.PORT
app.listen(port, async () => {

    try {
        await connection
        console.log("connected to db")
        console.log(`server running in port ${port}`)
    }
    catch (err) {
        console.log(err)
    }
})