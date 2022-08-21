const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const authenticate = async (req, res, next) =>
{
    try
    {
        const token = req.cookies.imtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET)
        const rootUser = await User.findOne( { _id: verifyToken._id, 'tokens.token':token } )
        if(!rootUser)
        {
            throw new Error('User not found')
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        res.status(200).send('Authorized')
        next()
    }
    catch(err)
    {
        res.status(401).send('Unauthorized')
        console.log(err)
    }
}

module.exports = authenticate