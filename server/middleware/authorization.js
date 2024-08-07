const { Food } = require('../models')

async function authorization(req, res, next) {
    try {
        const { idUser, email } = req.user
        console.log(req.user);
        const { id } = req.params
        // let userData = await UserActivation.findByPk(idUser)
        let data = await Food.findByPk(id)
        console.log(data, '<<<<< data');
        console.log(idUser, '<<<<< idUser');
        if (!data) {
            // console.log('ini error auth gaada data');
            throw { name: "dataNotFound" }
        }
        if (data.UserId === idUser) {
            next()
        } else {
            throw { name: "notYourData" }
        }
    } catch (error) {
        next(error)
    }
}
module.exports = { authorization }