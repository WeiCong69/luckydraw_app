import {
  DB,
  USER,
  PASSWORD,
  HOST,
  dialect as _dialect,
  pool as _pool,
} from '../config/db.config.js'
import Sequelize from 'sequelize'
import user from './user.model.js'
import userDetails from './userDetails.model.js'
import role from './role.model.js'
import gift from './gift.model.js'
import room from './room.model.js'

const Op = Sequelize.Op
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  operatorsAliases: false,

  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle,
  },
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = user(sequelize, Sequelize)
db.userDetails = userDetails(sequelize, Sequelize)
db.role = role(sequelize, Sequelize)
db.rooms = room(sequelize, Sequelize)
db.gifts = gift(sequelize, Sequelize)

db.users.hasMany(db.role)
db.users.hasOne(db.userDetails)

db.rooms.hasMany(db.gifts)

db.ROLES = ['user', 'admin', 'moderator']

export default db
