import db from '../models/index.js'

const create = async (userId, roomId, giftId) => {
  try {
    await db.history.create({
      userId,
      roomId,
      giftId,
    })
  } catch (error) {
    console.error('Error creating history record:', error)
    throw new Error('Failed to create history record')
  }
}

const _delete = async (req, res) => {
  //Necessary?
}

const edit = async (req, res) => {
  //Necessary?
}

const view = async (req, res) => {
  try {
    // Extract roomId and userId from the request body
    const { roomId, userId } = req.body

    let whereCondition = {}

    if (roomId) {
      whereCondition.roomId = roomId
    }

    if (userId) {
      whereCondition.userId = userId
    }

    const historyWithDetails = await db.history.findAll({
      where: whereCondition,
      include: [{ model: db.users }, { model: db.rooms }, { model: db.gifts }],
    })

    res.json(historyWithDetails)
  } catch (error) {
    console.error('Error fetching history with details:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default {
  create,
  _delete,
  edit,
  view,
}
