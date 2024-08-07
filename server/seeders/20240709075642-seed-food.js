'use strict';

const { default: axios } = require('axios');

/** @type {import('sequelize-cli').Migration} */

const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
module.exports = {
  async up(queryInterface, Sequelize) {
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
      if(!el.strSource){
        el.strSource = "Source Not Found"
      }

      return {
        strMeal: el.strMeal,
        strCategory: el.strCategory,
        strArea: el.strArea,
        strInstructions: el.strInstructions,
        strMealThumb: el.strMealThumb,
        strYoutube: el.strYoutube,
        strIngredient: el.ing,
        strMeasure: el.ms,
        strSource: el.strSource,
        createdAt : new Date (),
        updatedAt : new Date (),
        UserId : 1
      }
    })
    await queryInterface.bulkInsert('Foods', data)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Foods', null, { truncate: true, cascade: true, restartIdentity: true })
  }
};
