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
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdminOrUser],
    gift.createOrEdit
  )

  app.post(
    '/api/gift/getAllByRoom',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdminOrUser],
    gift.getAllGifts
  )

  app.post(
    '/api/gift/edit',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdminOrUser],
    gift.createOrEdit
  )

  app.post(
    '/api/gift/delete',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdminOrUser],
    gift._delete
  )
}
