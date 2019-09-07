const { BEST_PRICE, REGULAR_TEXT } = require('./config');
const model = () => {
  const getIntent = (msg) => {
    if (msg.includes('harga') && msg.includes('murah')) { 
      const splitted = msg.split(' ');
      return {
        message: msg,
        intent: BEST_PRICE + '.' + splitted[splitted.length - 1]
      } 
    } else {
      return {
        message: msg,
        intent: REGULAR_TEXT + '.Mohon maaf, Inem ga ngerti maksudnya :('
      }
    }
  }
  return (msg) => {
    const response = getIntent(msg)
    return response;
  }
}

module.exports = model;