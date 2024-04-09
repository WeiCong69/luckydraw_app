import { Sequelize } from 'sequelize'

export default (sequelize, Sequelize) => {
  const Room = sequelize.define('rooms', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
    },
  })

  return Room
}
