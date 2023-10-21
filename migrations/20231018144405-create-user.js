module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('movies', 'photo_path', {
          type: Sequelize.STRING(255),
          allowNull: true,
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('movies', 'photo_path');
  }
};