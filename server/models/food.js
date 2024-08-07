'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.hasMany(models.FoodUser)
    }
  }
  Food.init({
    strMeal:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strMeal is required"
        },
        notNull: {
          msg: 'strMeal is required'
        }
      }
    },
    strCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strCategory is required"
        },
        notNull: {
          msg: 'strCategory is required'
        }
      }
    },
    strArea: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strArea is required"
        },
        notNull: {
          msg: 'strArea is required'
        }
      }
    },
    strInstructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strInstructions is required"
        },
        notNull: {
          msg: 'strInstructions is required'
        }
      }
    },
    strMealThumb: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strMealThumb is required"
        },
        notNull: {
          msg: 'strMealThumb is required'
        }
      }
    },
    strYoutube: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strYoutube is required"
        },
        notNull: {
          msg: 'strYoutube is required'
        }
      }
    },
    strIngredient: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strIngredient is required"
        },
        notNull: {
          msg: 'strIngredient is required'
        }
      }
    },
    strMeasure: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strMeasure is required"
        },
        notNull: {
          msg: 'strMeasure is required'
        }
      }
    },
    strSource: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "strSource is required"
        },
        notNull: {
          msg: 'strSource is required'
        }
      }
    },
    UserId : {
      type :  DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'Foods'
  });
  return Food;
};