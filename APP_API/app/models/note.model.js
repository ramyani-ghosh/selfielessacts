const mongoose = require('mongoose');

const ActSchema = mongoose.Schema({
  actId:Number,
  category:String,
  caption:String,
  timestamp:String,
  imgUrl:String
});

module.exports = mongoose.model('Act', ActSchema);
