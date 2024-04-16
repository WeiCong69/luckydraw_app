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
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    room.view
  )

  app.put(
    '/api/room/edit/:id',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    room.edit
  )

  app.delete(
    '/api/room/delete/:id',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    room._delete
  )
}
