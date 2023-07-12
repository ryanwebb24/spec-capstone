require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

module.exports = {
    isAuthenticated: (req, res, next) => {
        // this gets the token from the header
        const headerToken = req.get('Authorization')
        // this checks if there is no token and returns an error and sends the error status code
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token
        // this does a jwt check and compares the two keys if they are the same if they arent then it throws and error
        try {
            console.log(jwt.decode(headerToken))
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        // after the check this will see if the token was set and is real and if its not it will send an error status code 
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}