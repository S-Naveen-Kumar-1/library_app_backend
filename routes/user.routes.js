const express = require("express")

const userRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model");

userRouter.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        if (!name || !email || !password || !role) {
            return res.status(400).send({
                "msg": "Please fill all details",
            });
        }
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).send({
                "msg": `This email has already been registered.`,
            });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(200).send({ "err": "couldnot hash the password" })
            }
            else {
                const newUser = await UserModel({
                    name,
                    email,
                    password: hash,
                    role
                })
                await newUser.save()
                res.status(200).send({ "msg": "user registered successfully", "user_details": newUser })
            }
        })

    }
    catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({
                "msg": "Please fill all details",
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                "msg": "User not registered",
            });
        }
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ name: user.name, userID: user._id }, "naveen")
                res.status(200).send({ "msg": "login success", "token": token, user: user })
            }
            else {
                res.status(201).send({ "msg": "wrong credentials" })
            }
        });
    }
    catch (err) {
        res.status(400).send({ "msg": err.message })

    }
})
module.exports = { userRouter }