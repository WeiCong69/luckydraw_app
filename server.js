import express, { urlencoded } from 'express'
import { createClient } from 'redis'
import { createServer } from 'http'
import { createAdapter } from '@socket.io/redis-adapter'
import cors from 'cors'
import { config } from 'dotenv'
import db from './app/models/index.js'
import authRoute from './app/routes/auth.route.js'
import userRoute from './app/routes/user.route.js'
import cookieSession from 'cookie-session'
import giftRoute from './app/routes/gift.route.js'
import roomRoute from './app/routes/room.route.js'
import socketHandler from './socketHandler.js'
import historyRoute from './app/routes/history.route.js'

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3080/',
  'http://127.0.0.1:3080',
  process.env.ip,
]

const app = express()
const server = createServer(app)
const { io, publishMessage, isAcknowledged } = socketHandler(server, whitelist) // Assuming `whitelist` is defined

const Role = db.role
const Room = db.rooms
const Gift = db.gifts

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
giftRoute(app)
roomRoute(app)
historyRoute(app)

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
  // mockedLuckyDrawData() // mocked data for testing lucky draw
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

async function mockedLuckyDrawData() {
  try {
    const [room, created] = await Room.findOrCreate({
      where: { name: 'Huawei Event free gifts 666' },
      defaults: {
        name: 'Huawei Event free gifts 666',
        isActive: true,
      },
    })

    if (created) {
      console.log('Room created with id:', room.id)

      Gift.create({
        name: 'Huawei Earbud',
        likelihood: 2.5,
        quantity: 5,
        roomId: room.id,
      })

      Gift.create({
        name: 'Huawei Hairband',
        likelihood: 5.7,
        quantity: 5,
        roomId: room.id,
      })

      Gift.create({
        name: 'Huawei Lipstick',
        likelihood: 8.3,
        quantity: 5,
        roomId: room.id,
      })
    } else {
      console.log('Room already exists with id:', room.id)
    }
  } catch (error) {
    console.error('Error creating mocked data:', error)
  }
}

;(async () => {
  const pubClient = createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASS,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      tls: true,
    },
  }) // Add your Redis URL here
  const subClient = pubClient.duplicate()

  await Promise.all([pubClient.connect(), subClient.connect()])

  io.adapter(createAdapter(pubClient, subClient))

  const port = process.env.SERVER_PORT || 3080
  server.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
})()

export { io, publishMessage, isAcknowledged }
