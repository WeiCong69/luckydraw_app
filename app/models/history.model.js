import { Sequelize } from 'sequelize'

export default (sequelize, Sequelize) => {
  const History = sequelize.define('histories', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'rooms',
        key: 'id',
      },
    },
    giftId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'gifts',
        key: 'id',
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  })

  return History
}
