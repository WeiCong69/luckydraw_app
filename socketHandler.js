import { Server } from 'socket.io'

//https://medium.com/@techWithAditya/mastering-real-time-communication-an-in-depth-guide-to-implementing-pub-sub-patterns-in-node-js-8a3ccc05d150

const socketHandler = (server, whitelist) => {
  const io = new Server(server, {
    cors: {
      credentials: true,
      origin: whitelist,
    },
    maxHttpBufferSize: 1e8,
  })

  io.on('connection', (socket) => {
    console.log('A new client connected')

    socket.on('subscribe', (channel) => {
      console.log(`Subscribing to channel: ${channel}`)
      socket.join(channel)
    })

    socket.on('unsubscribe', (channel) => {
      console.log(`Unsubscribing from channel: ${channel}`)
      socket.leave(channel)
    })

    socket.on('send', function (channel, message) {
      console.log(`sending message from ${channel} => ${message}`)
      io.to(channel).emit('message', message)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })

    socket.on('message', function (message) {
      console.log('received message:', message)
    })
  })

  const publishMessage = (channel, message) => {
    io.to(channel).emit('message', message)
    console.log(channel, message)
  }

  return { io, publishMessage }
}

export default socketHandler
