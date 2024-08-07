'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FoodUser.belongsTo(models.User)
      FoodUser.belongsTo(models.Food)
    }
  }
  FoodUser.init({
    FoodId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Foods",
        key: "id"
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'FoodUser',
  });
  return FoodUser;
};