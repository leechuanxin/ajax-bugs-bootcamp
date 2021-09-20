module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('bugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      problem: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      error_text: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      commit: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      feature_id: {
        type: Sequelize.INTEGER,
        // This links the category_id column to the id column in the categories table
        references: {
          model: 'features',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    // Bugs table needs to be dropped first because Bugs references Features
    await queryInterface.dropTable('bugs');
    await queryInterface.dropTable('features');
  },
};
