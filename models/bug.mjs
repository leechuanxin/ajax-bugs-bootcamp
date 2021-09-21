export default function initBugModel(sequelize, DataTypes) {
  return sequelize.define('bug', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    problem: {
      type: DataTypes.STRING,
    },
    errorText: {
      type: DataTypes.STRING,
    },
    commit: {
      type: DataTypes.STRING,
    },
    featureId: {
      type: DataTypes.INTEGER,
      // This links the categoryId column to the id column in the categories table
      references: {
        model: 'features',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      // This links the categoryId column to the id column in the categories table
      references: {
        model: 'users',
        key: 'id',
      },
    },
    // ... [<OTHER_COLUMNS>]
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    // The underscored option makes Sequelize reference snake_case names in the DB.
    underscored: true,
  });
}
