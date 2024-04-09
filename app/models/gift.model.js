import { Sequelize } from 'sequelize'

export default (sequelize, Sequelize) => {
  const Gift = sequelize.define('gifts', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    likelihood: {
      type: Sequelize.FLOAT,
    },
    roomId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'rooms',
        key: 'id',
      },
    },
  })

  return Gift
}
