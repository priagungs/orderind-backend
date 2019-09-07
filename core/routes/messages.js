const router = require('express').Router();
const Message = require('../models/Message');

router.get('/', async (req, res) => {
  try {
    const { merchantId } = req.query;
    const messages = await Message.find({
      merchant: merchantId
    }).sort({ updated_at: 1 });
    res.send({
      status: 200,
      message: 'Ok',
      data: messages
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

module.exports = router;