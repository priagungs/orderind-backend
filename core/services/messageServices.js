const Item = require('../models/Item');
const message_type = {
  BEST_PRICE: 'best_price',
}
module.exports = () => {
  const processIntent = async (type, value) => {
    if (type === message_type.BEST_PRICE) {
      return await Item.findOne({
        name: {
          "$regex": value, '$options': 'i'
        }
      }).sort({ price: -1 });
    }
    return null;
  }
  const processMessage = async (message) => {
    const splittedMessage = message.split('.');
    const type = splittedMessage[0];
    const value = splittedMessage[1];
    return await processIntent(type, value)
  }

  return {
    processMessage,
  }
}