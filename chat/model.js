const { NlpManager } = require("node-nlp");
const { BEST_PISANG, BEST_TOMAT } = require("./config");
const generalModel = new NlpManager({ languages: ['id'] });

// order listing
generalModel.addDocument('id', 'mau pisang harga termurah dong', BEST_PISANG);
generalModel.addDocument('id', 'pisang harga paling murah apa ya', BEST_PISANG);

generalModel.addDocument('id', 'mau tomat harga termurah dong', BEST_TOMAT);
generalModel.addDocument('id', 'tomat harga paling murah apa ya', BEST_TOMAT);

const model = async () => {
  await generalModel.train();
  generalModel.save();
  return async (msg) => {
    const response = await generalModel.process('id', msg);
    return response.intent;
  }
}

module.exports = model;