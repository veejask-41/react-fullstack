module.exports = (sequelize, dataTypes) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: dataTypes.STRING,
      allowNull: false
    }
  });

  return Comments;
};
