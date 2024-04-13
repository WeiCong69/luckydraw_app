import jwt from 'jsonwebtoken'
import { secret } from '../config/auth.config.js'
import db from '../models/index.js'
const User = db.users

function verifyToken(req, res, next) {
  let token = req.session.token

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    })
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

async function isUser(req, res, next) {
  try {
    const user = await User.findByPk(req.userId)
    const role = await user.roleId
    if (role === 1) {
      return next()
    }

    return res.status(403).send({
      message: 'Require User Role!',
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate User role!',
    })
  }
}

async function isAdmin(req, res, next) {
  try {
    const user = await User.findByPk(req.userId)
    const role = await user.roleId
    if (role === 3) {
      return next()
    }

    return res.status(403).send({
      message: 'Require Admin Role!',
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate User role!',
    })
  }
}

async function isModerator(req, res, next) {
  try {
    const user = await User.findByPk(req.userId)
    const role = await user.roleId
    if (role === 2) {
      return next()
    }

    return res.status(403).send({
      message: 'Require Moderator Role!',
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Moderator role!',
    })
  }
}

async function isModeratorOrAdmin(req, res, next) {
  try {
    const user = await User.findByPk(req.userId)
    const role = await user.roleId
    if (role === 2 || role === 3) {
      return next()
    }

    return res.status(403).send({
      message: 'Require Moderator or Admin Role!',
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate Moderator or Admin role!',
    })
  }
}

const authJwt = {
  verifyToken,
  isUser,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
}
export default authJwt
