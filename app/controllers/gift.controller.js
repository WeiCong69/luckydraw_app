import LuckyDrawResponseDTO from '../DTOs/luckyDrawResponseDTO.js'
import db from '../models/index.js'
import Sequelize from 'sequelize'
import { publishMessage, isAcknowledged } from '../../server.js'

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
      const totalLikelihood = gifts.reduce(
        (acc, gift) => acc + gift.likelihood,
        0
      )
      const randomNumber = Math.random() * totalLikelihood

      const selectedGift = gifts.reduce(
        (acc, gift) => {
          if (
            !acc.selectedGift &&
            randomNumber <= acc.cumulativeProbability + gift.likelihood
          ) {
            return {
              cumulativeProbability:
                acc.cumulativeProbability + gift.likelihood,
              selectedGift: gift,
            }
          }
          return acc
        },
        { cumulativeProbability: 0, selectedGift: null }
      ).selectedGift

      if (selectedGift) {
        await updateGiftQuantity(selectedGift)
        return new LuckyDrawResponseDTO({ gifts: selectedGift })
      } else {
        return new LuckyDrawResponseDTO({ error: 'Better luck next time!' })
      }
    } else {
      return null // No gifts in prize pool
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

    if (!result) {
      // No gifts in prize pool
      result = new LuckyDrawResponseDTO({ error: 'No gifts in prize pool.' })
    }
  }

  publishMessage('channel-1', result)
  res.status(result.error ? 200 : 500).json(result)
}

export default {
  luckyDraw,
}
