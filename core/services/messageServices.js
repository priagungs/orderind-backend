const Item = require('../models/Item');
const Message = require('../models/Message');
const intent_type = {
  BEST_PRICE: 'best_price',
}
const { messageType } = require('../config');
module.exports = () => {
  const processIntent = async (type, value, merchantId) => {
    if (type === intent_type.BEST_PRICE) {
      return await Message.create({
        merchant: merchantId,
        fromBot: true,
        message: {
          type: messageResponseType.CAROUSEL,
          message: await Item.findOne({
            name: {
              "$regex": value, '$options': 'i'
            }
          }).sort({ price: -1 })
        }
      });
    }
    return null;
  }

  const processMessage = async (message, merchantId) => {
    const messageObj = JSON.parse(message);
    await Message.create({
      merchant: merchantId,
      fromBot: false,
      message: {
        type: messageType.TEXT,
        data: messageObj.message
      }
    });
    const splittedMessage = message.intent.split('.');
    const type = splittedMessage[0];
    const value = splittedMessage[1];
    return await processIntent(type, value, merchantId)
  }

  return {
    processMessage,
  }
}