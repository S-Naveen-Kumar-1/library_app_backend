const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    category: String,
    name: String,
    userID: String,
    createdAt: { type: Date, default: Date.now },
},
    { versionKey: false }
)
const BookModel = mongoose.model("book", bookSchema)
module.exports = { BookModel }