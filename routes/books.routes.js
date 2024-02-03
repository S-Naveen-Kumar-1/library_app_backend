const express = require("express");
const { BookModel } = require("../model/books.model");
const { auth } = require("../middlewares/auth.middleware");

const bookRouter = express.Router();
bookRouter.use(auth)
bookRouter.post("/", async (req, res) => {
    try {
        const newBook = new BookModel(req.body)
        await newBook.save()
        res.status(200).send({ "msg": "book as been added successfully", "bookDetails": req.body })
    }
    catch (err) {
        res.status(400).send({ "msg": err })
    }
})
bookRouter.get("/", async (req, res) => {
    try {
        const books = await BookModel.find()
        res.status(200).send(books)
    }
    catch (err) {
        res.status(400).send({ "err": err })
    }
})
bookRouter.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findOne({ _id: id })
    console.log("book", book)
    try {
        if (req.body.userID === book.userID) {
            await BookModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).send({ "msg": `the book with id ${id} has been updated successfully` })
        }
        else {
            res.status(200).send({ "msg": "youre not authorized" })
        }
    }
    catch (err) {
        res.status(400).send({ "err": err })

    }
})
bookRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findOne({ _id: id })
    console.log("book", book)
    try {
        if (req.body.userID === book.userID) {
            await BookModel.findByIdAndDelete({ _id: id }, req.body)
            res.status(200).send({ "msg": `the book with id ${id} has been deleted successfully` })
        }
        else {
            res.status(200).send({ "msg": "youre not authorized" })
        }
    }
    catch (err) {
        res.status(400).send({ "err": err })

    }
})
bookRouter.get("/old", async (req, res) => {
    try {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        console.log(tenMinutesAgo)
        const oldBooks = await BookModel.find({ createdAt: { $lt: tenMinutesAgo } });
        res.status(200).send(oldBooks)
    }
    catch (err) {
        res.status(400).send({ "err": err })
    }
})
bookRouter.get("/new", async (req, res) => {
    try {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        console.log(tenMinutesAgo)
        const newBooks = await BookModel.find({ createdAt: { $gte: tenMinutesAgo } });
        res.status(200).send(newBooks)
    }
    catch (err) {
        res.status(400).send({ "err": err })
    }
})
module.exports = { bookRouter }