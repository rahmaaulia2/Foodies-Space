const { verifyToken } =  require('../helper/jwt')
const { User } =  require('../models')

async function authentication (req, res, next){
    try {
        let access_token1 = req.headers.authorization; 
        if(!access_token) {
            throw {name : 'Invalid Token'}
        }
        let [Bearer, access_token] = access_token1.split(" ");
        if(!Bearer) {
            throw {name : 'Invalid Token'}
        }
        let payload = verifyToken(access_token) 
        let user = await User.findByPk(payload.id) //ambil data buat dikirim ke req.user
        if(!user) {
            throw {name : 'Invalid Token'}
        }
        req.user = {
            idUser : user.id,
            email : user.email
        } 
        next()
    } catch (error) {
        // res.send(error)
        next(error)
    }
}

module.exports = authentication