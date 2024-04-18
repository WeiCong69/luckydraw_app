import middleware from '../middleware/index.js'
import gift from '../controllers/gift.controller.js'

export default function (app) {
  app.use(function (req, res, next) {
    req.get('Referrer')
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
    next()
  })

  app.post(
    '/api/gift/luckyDraw',
    [middleware.authJwt.verifyToken, middleware.authJwt.isUser],
    gift.luckyDraw
  )

  app.post(
    '/api/gift/create',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    gift.create
  )

  app.get(
    '/api/gift/getAllByRoom',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    gift.getAllGifts
  )

  app.put(
    '/api/gift/edit/:id',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    gift.edit
  )

  app.delete(
    '/api/gift/delete/:id',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    gift._delete
  )
}
