const Item = require('../models/Item');
module.exports = () => {
  const processMessage = async (message) => {
    const name = message.split('.')[1];
    return await Item.findOne({
      name
    }).sort({ price: -1 });

  }

  module.exports = {
    processMessage,
  }
}