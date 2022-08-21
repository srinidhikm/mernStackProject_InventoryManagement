const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        compname:
        {
            type: String,
            require: true
        },
        email:
        {
            type: String,
            require: true
        },
        phno:
        {
            type: Number,
            require: true
        },
        password:
        {
            type: String,
            require: true
        },
        cpassword:
        {
            type: String,
            require: true
        },
        tokens:[
            {
                token:
                {
                    type: String,
                    require: true
                }
            }
        ]
    }
)

// Hashing password
userSchema.pre('save', async function(next)
{
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

// Generating token for login
userSchema.methods.generateAuthToken = async function ()
{
    try
    {
        let token = jwt.sign({_id: this.id}, process.env.SECRET);
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token;
    }
    catch(err)
    {
        console.log(err);
    }
}

// Creating collection
const Users = mongoose.model('REGISTRATION', userSchema);
module.exports = Users;