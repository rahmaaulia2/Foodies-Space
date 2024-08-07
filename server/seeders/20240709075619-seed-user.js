'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require ('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const salt = bcrypt.genSaltSync(10)
   const data = [{
      fullName : 'Rahma Aulia',
      email : 'rahma1@gmail.com',
      password : '123456',
      gender : 'female'
   }].map((el)=>{
    el.password = bcrypt.hashSync(el.password, salt)
    el.createdAt = new Date ()
    el.updatedAt = new Date ()
    return el
   })
   await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {truncate : true, cascade : true, restartIdentity : true})
  }
};
