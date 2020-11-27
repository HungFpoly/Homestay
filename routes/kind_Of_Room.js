var express = require('express');
var router = express.Router();
var KindOfRoom = require('../model/kind_Of_Room');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/kindOfRoom/danh-sach.html'); 
});

router.get('/danh-sach.html', function(req, res, next) {
	 KindOfRoom.find().then(function(data){
		res.render('admin/kindOfRoom/danhsach', {data: data});
	});
  	
});

router.get('/them-kindOfRoom.html', function(req, res, next) {
  res.render('admin/kindOfRoom/them', { errors: null});
});


router.post('/them-kindOfRoom.html', function(req, res, next) {
	
  req.checkBody('Kind_Of_Room', 'Giá Trị không được rổng').notEmpty();
  req.checkBody('Kind_Of_Room', 'Name 5 đến 32 ký tự').isLength({min:3, max:32});
  var errors = req.validationErrors();
	if (errors) {
	  res.render('admin/kindOfRoom/them',{errors : errors}); 
	}

	var kindOfRoom = new KindOfRoom({
		Kind_Of_Room  : req.body.Kind_Of_Room,
	});

	kindOfRoom.save().then(function(){
		req.flash('success_msg', 'Đã Thêm Thành Công');
		res.redirect('/admin/kindOfRoom/them-kindOfRoom.html'); 
	});


});

router.get('/:id/sua-kindOfRoom.html', function(req, res, next) {
	KindOfRoom.findById(req.params.id, function(err, data){
		res.render('admin/kindOfRoom/sua',{ errors: null, data: data});
	});	
});

router.post('/:id/sua-kindOfRoom.html', function(req, res, next) {
	req.checkBody('Kind_Of_Room', 'Giá Trị không được rổng').notEmpty();
	req.checkBody('Kind_Of_Room', 'Name 5 đến 32 ký tự').isLength({min:3, max:32});
  	var errors = req.getValidationResult();
  	if(errors){
  		KindOfRoom.findById(req.params.id, function(err, data){
			res.render('admin/kindOfRoom/sua',{ errors: errors, data: data});
		});	
  	}else{
  		KindOfRoom.findById(req.params.id, function(err, data){
			data.Kind_Of_Room = req.body.Kind_Of_Room;
			data.save();
			req.flash('success_msg', 'Đã Sửa Thành Công');
			res.redirect('/admin/kindOfRoom/'+req.params.id+'/sua-kindOfRoom.html');
		});
  	}

});

router.get('/:id/xoa-kindOfRoom.html',  function(req, res, next) {
	
	KindOfRoom.findById(req.params.id).remove(function() { 
		req.flash('success_msg', 'Đã Xoá Thành Công');
		res.redirect('/admin/kindOfRoom/danh-sach.html');
	});
});

// function checkAdmin(req, res, next){
   
//     if(req.isAuthenticated()){
//       next();
//     }else{
//       res.redirect('/admin/dang-nhap.html');
//     }
// }
module.exports = router;