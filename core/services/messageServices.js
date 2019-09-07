const Item = require('../models/Item');
const Message = require('../models/Message');
const intent_type = {
  BEST_PRICE: 'best_price',
}
const { messageType } = require('../config');
module.exports = () => {
  const processIntent = async (type, value, merchantId) => {
    console.log("MESSAGE SERVICE " + value);
    if (type === intent_type.BEST_PRICE) {
      return await Message.create({
        merchant: merchantId,
        fromBot: true,
        message: {
          type: messageType.CAROUSEL,
          data: await Item.find({
            name: {
              "$regex": value, '$options': 'i'
            }
          }).sort({ price: -1 }).limit(5)
        }
      });
    } else {
      console.log(value);
      return await Message.create({
        merchant: merchantId,
        fromBot: true,
        message: {
          type: messageType.TEXT,
          data: value
        }
      });
    }
  }

  const processMessage = async (message, merchantId) => {
      await Message.create({
      merchant: merchantId,
      fromBot: false,
      message: {
        type: messageType.TEXT,
        data: message.message
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