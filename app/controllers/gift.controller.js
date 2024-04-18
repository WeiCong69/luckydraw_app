import LuckyDrawResponseDTO from '../DTOs/luckyDrawResponseDTO.js'
import db from '../models/index.js'
import Sequelize from 'sequelize'
import { publishMessage, isAcknowledged } from '../../server.js'
import historyController from './history.controller.js'

const Gift = db.gifts

const performLuckyDraw = async (roomId) => {
  const gifts = await Gift.findAll({
    where: { roomId, quantity: { [Sequelize.Op.gt]: 0 } },
  })

  return gifts.length > 0 ? gifts : null
}

const updateGiftQuantity = async (selectedGift) => {
  await Gift.update(
    { quantity: selectedGift.quantity - 1 },
    { where: { id: selectedGift.id } }
  )
}

const processLuckyDraw = async (req) => {
  try {
    const gifts = await performLuckyDraw(req.body.roomId)

    if (gifts) {
      const randomIndex = Math.floor(Math.random() * gifts.length)
      const selectedGift = gifts[randomIndex]

      await updateGiftQuantity(selectedGift)

      return new LuckyDrawResponseDTO({ gifts: selectedGift })
    } else {
      return new LuckyDrawResponseDTO({ error: 'No gifts in prize pool.' })
    }
  } catch (error) {
    console.error('Error during lucky draw:', error)
    return new LuckyDrawResponseDTO({ error })
  }
}

const luckyDraw = async (req, res) => {
  let result = null

  if (!isAcknowledged) {
    result = new LuckyDrawResponseDTO({
      error: 'Previous message has not been acknowledged',
    })
  } else {
    result = await processLuckyDraw(req)

    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiii', result.gifts.dataValues.id)
    if (result && !result.error) {
      try {
        await historyController.create(
          req.userId,
          req.body.roomId,
          result.gifts.dataValues.id
        )
      } catch (error) {
        console.error('Error creating history record:', error)
        result = new LuckyDrawResponseDTO({ error: 'Failed to record history' })
      }
    } else if (!result) {
      result = new LuckyDrawResponseDTO({ error: 'No gifts in prize pool.' })
    }
  }

  publishMessage('channel-1', result)
  res.status(result.error ? 200 : 500).json(result)
}

const create = async (req, res) => {
  try {
    const gift = await Gift.create(req.body)
    res.status(201).json(gift)
  } catch (error) {
    console.error('Error creating gift:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
const _delete = async (req, res) => {
  try {
    const rowsDeleted = await Gift.destroy({ where: { id: req.params.id } })
    if (rowsDeleted === 0) {
      res.status(404).json({ error: 'Gift not found' })
    } else {
      res.status(204).end()
    }
  } catch (error) {
    console.error('Error deleting gift:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

const edit = async (req, res) => {
  try {
    const [rowsUpdated, updatedGift] = await Gift.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    if (rowsUpdated === 0) {
      res.status(404).json({ error: 'Gift not found' })
    } else {
      res.json(updatedGift[0])
    }
  } catch (error) {
    console.error('Error updating gift:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
const getAllGifts = async (req, res) => {
  try {
    let gifts
    if (req.query.roomId) {
      gifts = await Gift.findAll({ where: { roomId: req.query.roomId } })
    } else {
      gifts = await Gift.findAll()
    }
    res.json(gifts)
  } catch (error) {
    console.error('Error fetching gifts:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default {
  luckyDraw,
  create,
  _delete,
  edit,
  getAllGifts,
}
