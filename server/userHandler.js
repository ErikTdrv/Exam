const User = require("./userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function registerHandler(data){
    try {
        const existingUsername = await User.findOne({username: data.username});
        const existingEmail = await User.findOne({email: data.email});
        if(existingUsername){
            throw new Error('Username already exists!')
        }else if(existingEmail){
            throw new Error('Email already exists!')
        }
        const user = await User.create({username: data.username, email: data.email, password: data.password});
        return await createAccessToken(user);
    } catch (error) {
        return error;
    }
}
async function loginHandler(data){
    try {
        const user = await User.findOne({email: data.email});
        if(!user){
            throw new Error('No existing user!')
        }
        const isValid = await bcrypt.compare(data.password, user.password)
        if(isValid){
            return createAccessToken(user)
        }else {
            throw new Error('Wrong email or password!')
        }
    } catch (error) {
        return error;
    }
}
const createAccessToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    }
    const accessToken = jwt.sign(payload, 'danjdm1qd192jwq');
    return {
        _id: user._id,
        email: user.email,
        accessToken
    }
}

module.exports = {
    registerHandler,
    loginHandler,
}