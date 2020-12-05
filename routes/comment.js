var express = require('express');
var router = express.Router();
var newComment = require('../model/comment');
var Products = require("../model/Product");
const { route } = require('./cart');
var User = require('../model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/site/page/comment'); 
});

  router.post('/site/page/comment',function (req, res, next) {
    const prodId = req.params.productId;
    var tname;
    if (typeof req.user === "undefined") {
      tname = req.body.inputName;
    } else {
      tname = req.user.username;
    }
    Products.findOne({
      _id: prodId
    }).then(product => {
      var today = new Date();
      product.comment.items.push({
        title: req.body.inputTitle,
        content: req.body.inputContent,
        name: tname,
        date: today,
        star: req.body.rating
      });
      product.comment.total++;
      product.save();
    });
    res.redirect("back");
  });

module.exports = router;