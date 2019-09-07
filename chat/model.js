const { BEST_PRICE } = require('./config');
const model = () => {
  const getIntent = (msg) => {
    if (msg.includes('harga') && msg.includes('murah')) { 
      const splitted = msg.split(' ');
      return {
        message: msg,
        intent: BEST_PRICE + '.' + splitted[splitted.length - 1]
      } 
    }
  }
  return (msg) => {
    const response = getIntent(msg)
    return response;
  }
}

module.exports = model;