import middleware from '../middleware/index.js'
import room from '../controllers/room.controller.js'

export default function (app) {
  app.use(function (req, res, next) {
    req.get('Referrer')
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
    next()
  })

  app.post(
    '/api/room/create',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    room.create
  )

  app.get(
    '/api/room/all',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdminOrUser],
    room.view
  )

  app.post(
    '/api/room/edit',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    room.edit
  )

  app.post(
    '/api/room/delete',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    room._delete
  )
}
