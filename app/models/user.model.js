export default (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    remark: {
      type: Sequelize.TEXT,
    },
    roleId: {
      type: Sequelize.INTEGER,
      references: {
         model: 'roles', // 'roles' refers to table name
         key: 'id', // 'id' refers to column name in roles table
      }
    }
  });

  return User;
};
