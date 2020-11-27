var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Product = new Schema({
  name 		    	:  String,
  nameKhongDau	: String,
  img 		    	: String,
  placeId 	   	: String,
  des 			    : String,
  price 		    : Number,
  st 			      : Number,
  Kind_Of_Room  : String,
  Kind_Of_RoomId: String  


},{collection : 'product'});

module.exports = mongoose.model('Product', Product);