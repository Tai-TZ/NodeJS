'use strict';


//Data fake
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //bulkInsert chèn nhiều bản ghi 1 lúc
    return queryInterface.bulkInsert('Users', [{
      email: '123admin@gmail.com',
      password: '123456',
      firstName: 'Tai',
      lastName: 'Thanh',
      address: 'Viet Nam',
      gender: 1,
      roleId: 'R1',

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
