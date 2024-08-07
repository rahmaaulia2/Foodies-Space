const express = require('express')
const Controller = require('../controllers/controller')
const authentication = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')
const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login/google', Controller.getGoogle)
router.post('/openai', Controller.getOpenai)
router.get('/foods', authentication, Controller.getFood)
router.post('/foods', authentication, Controller.addFood)
router.get('/foods/:id', authentication, Controller.getFoodById)
router.put('/foods/:id', authentication, authorization, Controller.updateFood)
router.delete('/foods/:id', authentication, authorization, Controller.deleteById)
router.get('/foods-user/:idUser', authentication, Controller.foodUser)


module.exports = router