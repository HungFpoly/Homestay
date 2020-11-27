var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var KindOfRoom = new Schema({
   Kind_Of_Room: { type: String, required: true }
},
{collection : 'kindOfRoom'});

module.exports = mongoose.model('kindOfRoom', KindOfRoom);