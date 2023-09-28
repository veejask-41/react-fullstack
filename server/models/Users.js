module.exports = (sequelize, dataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  });

  // Users.associate = (models) => {
  //   Users.hasMany(models.Posts, {
  //     onDelete: "cascade",
  //   });
  // };

  return Users;
};
