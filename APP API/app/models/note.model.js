const mongoose = require('mongoose');

const ActSchema = mongoose.Schema({
  actId:Number,
  category:String,
  caption:String,
  timestamp:String,
  imgUrl:String,
  upVotes:Number
});

module.exports = mongoose.model('Act', ActSchema);
