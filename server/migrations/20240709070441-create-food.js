'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Foods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      strMeal: {
        allowNull : false,
        type: Sequelize.STRING
      },
      strCategory: {
        allowNull : false,
        type: Sequelize.STRING
      },
      strArea: {
        allowNull : false,
        type: Sequelize.STRING
      },
      strInstructions: {
        allowNull : false,
        type: Sequelize.TEXT
      },
      strMealThumb: {
        allowNull : false,
        type: Sequelize.STRING
      },
      strYoutube: {
        allowNull : false,
        type: Sequelize.STRING
      },
      strIngredient: {
        allowNull : false,
        type: Sequelize.TEXT
      },
      strMeasure: {
        allowNull : false,
        type: Sequelize.TEXT
      },
      strSource: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Foods');
  }
};