const { BEST_PRICE } = require('./config');
const model = () => {
  const getIntent = (msg) => {
    if (msg.includes('harga') && msg.includes('murah')) { 
      const splitted = msg.split(' ');
      return BEST_PRICE + '.' + splitted[splitted.length - 1];
    }
  }
  return (msg) => {
    const response = getIntent(msg)
    return response.intent;
  }
}

module.exports = model;