import middleware from '../middleware/index.js'
import history from '../controllers/history.controller.js'

export default function (app) {
  app.use(function (req, res, next) {
    req.get('Referrer')
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
    next()
  })

  app.post(
    '/api/history/view',
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    history.view
  )
}
