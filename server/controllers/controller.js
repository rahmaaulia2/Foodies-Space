const { default: axios } = require("axios");
const { User, Food, FoodUser } = require('../models');
const { signToken } = require("../helper/jwt");
const bcrypt = require('bcryptjs');
const { where } = require("sequelize");
const { OAuth2Client } = require('google-auth-library');
const openAI = require("../helper/openAI");
const client = new OAuth2Client();

const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
class Controller {
    static async register(req, res, next) {
        try {
            const { fullName, email, password, gender } = req.body
            await User.create({ fullName, email, password, gender })
            res.status(201).json({ fullName, email, gender })
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async login(req, res, next) {
        try {
            console.log(req.body);
            const { username, email, password } = req.body
            if (!email) {
                throw { name: 'EmailIsRequired' }
            }
            if (!password) {
                throw { name: 'PasswordIsRequired' }
            }
            const user = await User.findOne({
                where: { email: email }
            })

            if (!user) {
                throw { name: 'EmailOrPasswordIsInvalid' }
            }
            const comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                throw { name: 'EmailOrPasswordIsInvalid' }
            }

            const access_token = signToken(user)
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async getGoogle(req, res, next) {
        try {
            console.log(req.body, "<<<<<<<<<<<");
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: "711274548355-nav63vbiji56u3q2bn3lu7os6t4dfmbo.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload()
            // console.log(payload, '<<<<<<<<<<INI PAYLOAD');
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                hooks: false,
                defaults: {
                    fullName: payload.name,
                    email: payload.email,
                    password: Math.random().toString(),
                    gender: "Female"
                },
            });

            const access_token = signToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }

    static async getOpenai(req, res, next) {
        // const {prompt} = req.body
        // const url = 'https://api.openai.com/v1/engines/davinci-codex/completions'
        try {
            // let response = await axios.post(url, {
            //     prompt,
            //     max_tokens:50
            // }, {
            //     headers: {
            //         'Authorization' :  `Bearer ${process.env.OPENAI_API_KEY}`
            //     }
            // })
            // res.json(response.data)
            let responseOpenAi = await openAI(req.body.prompt)
            res.status(200).json(responseOpenAi)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getFood(req, res, next) {
        try {
            let data = await Food.findAll()
            // console.log(data[0].strInstructions);
            res.status(200).json(data)
        } catch (error) {
            // res.send(error)
            next(error)
        }
    }

    static async addFood(req, res, next) {
        try {
            const { idUser } = req.user
            const { strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube, strIngredient, strMeasure, strSource } = req.body
            let data = await Food.create({ strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube, strIngredient, strMeasure, strSource, UserId: idUser })
            res.status(201).json(data)
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async getFoodById(req, res, next) {
        try {
            const { id } = req.params
            let data = await Food.findByPk(id)
            res.status(200).json({ data })
        } catch (error) {
            next(error)
        }
    }

    static async updateFood(req, res, next) {
        try {
            // console.log('masuk ga');
            const { id } = req.params
            const { strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube, strIngredient, strMeasure, strSource } = req.body
            console.log(req.body);
            if (Object.keys(req.body).length == 0) {
                throw { name: 'dataEmpty' }
            }
            let data1 = await Food.findByPk(id)
            console.log('test gessss');
            let data = await Food.update({ strMeal: strMeal, strCategory: strCategory, strArea: strArea, strInstructions: strInstructions, strMealThumb: strMealThumb, strYoutube: strYoutube, strIngredient: strIngredient, strMeasure: strMeasure, strSource: strSource }, { where: { id: id } })
            if (!data1) {
                // console.log('ini log data1 di controller update');
                throw { name: 'errorNotFound' }
            }
            let data2 = await Food.findByPk(id)
            res.status(200).json(data2)
        } catch (error) {
            next(error)
        }
    }

    static async deleteById(req, res, next) {
        try {
            const { id } = req.params
            let data = await Food.findByPk(id)
            if (!data) {
                throw { name: 'errorNotFound' }
            }
            await Food.destroy({ where: { id: id } })
            res.status(200).json({ message: `${data.strMeal} success to delete` })
        } catch (error) {
            next(error)
        }
    }

    static async foodUser(req, res, next) {
        try {
            const { idUser } = req.params
            let data = await Food.findAll({ where: { UserId: idUser } })
            res.status(200).json({ data })
        } catch (error) {
            next(error)
        }
    }

    static async fetchData(req, res) {
        try {
            const response = await axios.get(url)
            let data = response.data.meals.map(el => {
                el.ing = []
                el.ms = []
                Object.keys(el).forEach(elk => {
                    if (elk.includes('strIngredient') && el[elk]) {
                        el.ing.push(el[elk])
                    }
                    if (elk.includes('strMeasure') && el[elk]?.trim()) {
                        el.ms.push(el[elk])
                    }
                })
                el.ing = el.ing.join(', ')
                el.ms = el.ms.join(', ')
                return el
            });
            res.json(data)
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller