const { BEST_PRICE, REGULAR_TEXT } = require('./config');
const model = () => {
  const getIntent = (msg) => {
    if (msg.includes('harga') && msg.includes('murah')) { 
      const splitted = msg.split(' ');
      return {
        message: msg,
        intent: BEST_PRICE + '.' + splitted[splitted.length - 1]
      } 
    } else if(msg.includes('hi') || 
      msg.includes('Hi') || 
      msg.includes('helo') || 
      msg.includes('Helo') || 
      msg.includes('halo') || 
      msg.includes('Halo')) {
      return {
        message: msg,
        intent: REGULAR_TEXT + '.Halo juga, Apa Kabar ? :)'
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