module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Users;
};
