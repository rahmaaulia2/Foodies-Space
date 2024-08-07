const jwt = require('jsonwebtoken')
const JWT_SECRETS = process.env.JWT_SECRET
// const JWT_SECRETS = "ipFood"
// console.log(process.env.JWT_SECRET);

const signToken = (user) => {
    console.log(JWT_SECRETS);
    return jwt.sign({id : user.id, email : user.email}, JWT_SECRETS)
}

const verifyToken = (access_token)=> { //ini belum dipake
    return jwt.verify(access_token, JWT_SECRETS)
}

module.exports = {signToken, verifyToken}