import express, { urlencoded } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import db from './app/models/index.js'
import authRoute from './app/routes/auth.route.js'
import userRoute from './app/routes/user.route.js'
import cookieSession from 'cookie-session'
const app = express()
const Role = db.role

const whitelist = ['http://localhost:3306/', 'http://localhost:3080/']
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      console.log('origin:', origin, 'not allowed')
      callback(new Error())
    }
  },
}
config()

app.use(cors(corsOptions))
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(
  cookieSession({
    name: 'session',
    secret: 'COOKIE_SECRET', // should use as secret environment variable
    httpOnly: true,
  })
)

//routing below
authRoute(app)
userRoute(app)
app.get('/', cors(), (req, res) => {
  res.json({ message: 'Welcome to Best Application.' })
})
// create a GET route
app.get('/express_backend', (req, res) => {
  //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT haha' }) //Line 10
})

db.sequelize.sync().then(() => {
  console.log('Sync db.')
  //initial() //please uncommend at first initialize
})

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  })

  Role.create({
    id: 2,
    name: 'moderator',
  })

  Role.create({
    id: 3,
    name: 'admin',
  })
}

//set port
const port = process.env.SERVER_PORT || 3080
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)) //Line 6
