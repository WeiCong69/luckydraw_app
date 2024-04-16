import db from '../models/index.js'

const create = async (req, res) => {
  try {
    const { name, isActive } = req.body
    const room = await db.rooms.create({ name, isActive })
    res.status(201).json(room)
  } catch (error) {
    console.error('Error creating room:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const _delete = async (req, res) => {
  try {
    const room = await db.rooms.findByPk(req.params.id)
    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }
    await room.destroy()
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting room by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const edit = async (req, res) => {
  try {
    const { name, isActive } = req.body
    const room = await db.rooms.findByPk(req.params.id)
    if (!room) {
      return res.status(404).json({ error: 'Room not found' })
    }
    room.name = name
    room.isActive = isActive
    await room.save()
    res.json(room)
  } catch (error) {
    console.error('Error updating room by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const view = async (req, res) => {
  try {
    const rooms = await db.rooms.findAll()
    res.json(rooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default {
  create,
  _delete,
  edit,
  view,
}
