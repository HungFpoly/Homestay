var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var newComment = new Schema({
  productId: String,
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


},{collection : 'newComment'});

module.exports = mongoose.model('newComment', newComment);