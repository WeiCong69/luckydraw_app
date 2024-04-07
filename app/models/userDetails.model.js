export default (sequelize, Sequelize) => {
  const UserDetails = sequelize.define("userDetails", {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: Sequelize.STRING,
    },
    details: {
      type: Sequelize.STRING,
    },
    remark: {
      type: Sequelize.STRING,
    },
    userId:{
      type: Sequelize.INTEGER,
      references: {
         model: 'users', // 'users' refers to table name
         key: 'id', // 'id' refers to column name in users table
      }
    }
  });
  return UserDetails;
};
