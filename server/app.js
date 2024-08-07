/**
 * npx sequelize-cli model:generate --name User --attributes fullName:string,email:string,password:string,gender:string
 * npx sequelize-cli model:generate --name FoodUser --attributes foodId:integer,UserId:integer
 * npx sequelize-cli model:generate --name Food --attributes strMeal:string,strCategory:string,strArea:string,strInstructions:string,strMealThumb:string,strTags:string,strYoutube:string,strIngredient:string,strMeasure:string,strSource:string
 * npx sequelize migration:generate --name add-column-userId-food-table
 */

if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routers');
const errorHandler = require('./middleware/errorHandler');


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/', router)
app.use(errorHandler)

module.exports = app