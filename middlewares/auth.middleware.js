const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        jwt.verify(token, "naveen", (err, decoded) => {
            if (decoded) {
                req.body.userID = decoded.userID,
                    req.body.createdBy = decoded.name
                console.log(decoded)
                next()
            }
            else {
                res.send({ "msg": "You're not authorised" })
            }
        })
    }
    else {
        res.send({ "msg": "please login" })
    }
}
module.exports = { auth }