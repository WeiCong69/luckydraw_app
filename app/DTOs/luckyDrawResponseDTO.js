export default class LuckyDrawResponseDTO {
  constructor({ gifts = [], error = null }) {
    this.gifts = gifts
    this.error = error
  }
}
