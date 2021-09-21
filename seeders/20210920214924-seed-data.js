module.exports = {
  up: async (queryInterface) => {
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

    const users = [
      {
        email: 'chuanxin.lee@gmail.com',
        password: 'chuanxin123',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert categories
    const [navbarFeature] = await queryInterface.bulkInsert('features',
      features, {
        returning: true,
      });

    const [chuanxin] = await queryInterface.bulkInsert(
      'users',
      users,
      { returning: true },
    );

    const bugs = [
      {
        problem: 'The navbar does not appear at all.',
        error_text: 'Uncaught Exception!',
        commit: 'a6b316fe123',
        feature_id: navbarFeature.id,
        user_id: chuanxin.id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Bulk insert cart items
    await queryInterface.bulkInsert('bugs', bugs);
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // Delete rows from tables with foreign key references first
    await Promise.all([
      queryInterface.bulkDelete('bugs', null, {}),
    ]);
    await Promise.all([
      queryInterface.bulkDelete('features', null, {}),
      queryInterface.bulkDelete('users', null, {}),
    ]);
  },
};
