'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.FoodUser)
      User.hasMany(models.Food)
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "FullName is required"
        },
        notNull: {
          msg: 'FullName is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique :  true,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        notNull: {
          msg: 'Email is required'
        },
        isEmail : {
          msg : 'Input must Email Format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Gender is required'
        },
        notNull: {
          msg: 'Gender is required'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance, option) {
        const hash = bcrypt.hashSync(instance.password, 10);

        instance.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};