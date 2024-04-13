import LuckyDrawResponseDTO from '../DTOs/luckyDrawResponseDTO.js'
import db from '../models/index.js'
import Sequelize from 'sequelize'
import socketHandler from '../../socketHandler.js'

const Gift = db.gifts

const luckyDraw = async (req, res) => {
  try {
    const gifts = await Gift.findAll({
      where: { roomId: req.body.roomId, quantity: { [Sequelize.Op.gt]: 1 } },
    })

    if (gifts.length === 0) {
      return res.status(200).json(
        new LuckyDrawResponseDTO({
          error: 'No gifts in prize pool.',
        })
      )
    }

    // Calculate the total likelihood of winning
    const totalLikelihood = gifts.reduce(
      (acc, gift) => acc + gift.likelihood,
      0
    )

    // Generate a random number between 0 and totalLikelihood
    const randomNumber = Math.random() * totalLikelihood

    // Find the gift based on the random number and likelihood
    const selectedGift = gifts.reduce(
      (acc, gift) => {
        // If selectedGift is not yet found and randomNumber is less than or equal to cumulativeProbability
        if (
          !acc.selectedGift &&
          randomNumber <= acc.cumulativeProbability + gift.likelihood
        ) {
          return {
            cumulativeProbability: acc.cumulativeProbability + gift.likelihood,
            selectedGift: gift,
          }
        }
        // Otherwise, return the accumulator as it is
        return acc
      },
      { cumulativeProbability: 0, selectedGift: null }
    ).selectedGift

    if (selectedGift) {
      await Gift.update(
        { quantity: selectedGift.quantity - 1 },
        { where: { id: selectedGift.id } }
      )

      res.status(200).json(
        new LuckyDrawResponseDTO({
          gifts: selectedGift,
        })
      )

      socketHandler.io
        .to('channel-1')
        .emit('message', 'hello froms server side')
    } else {
      res.status(200).json(
        new LuckyDrawResponseDTO({
          error: 'Better luck next time!',
        })
      )
    }
  } catch (error) {
    console.error('Error during lucky draw:', error)
    res.status(500).json(new LuckyDrawResponseDTO({ error: error }))
  }
}

export default {
  luckyDraw,
}
