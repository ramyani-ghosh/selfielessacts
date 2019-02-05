const mongoose = require('mongoose');

const ActSchema = mongoose.Schema({
  actId:{ type:Number, index:{unique:true}},
  category:String,
  caption:String,
  timestamp:String,
  imgUrl:String,
  upVotes:Number
});

module.exports = mongoose.model('Act', ActSchema);
