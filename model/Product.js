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
  address       : String,
  kindId        : String,
  address       : Array,
  comment: {
    total: {
      type: Number,
      require: false,
      default: 0
    },
    items: [
      {
        title: {
          type: String
        },
        content: {
          type: String
        },
        name: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        },
        star: {
          type: Number
        }
      }
    ]
  }


},{collection : 'product'});

module.exports = mongoose.model('Product', Product);