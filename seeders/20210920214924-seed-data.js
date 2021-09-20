module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const features = [
      {
        name: 'Navbar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Sidebar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Menu',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Profile Page',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    queryInterface.bulkInsert('features', features);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('features', null);
  },
};
