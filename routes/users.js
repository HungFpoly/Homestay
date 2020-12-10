const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../model/User');
const { forwardAuthenticated } = require('../middleware/auth');

// Login Page
router.get('/site/page/login', forwardAuthenticated, (req, res) => res.render('site/page/login'));
router.get('/site/page/account', forwardAuthenticated, (req, res) => res.render('site/page/account'));

// Register Page
router.get('/site/page/register', forwardAuthenticated, (req, res) => res.render('site/page/register'));
/* GET home page. */
router.get('/',function(req, res, next) {
  res.redirect('/admin/users/danh-sach.html'); 
});
router.get('/danh-sach.html', function(req, res, next) {
  User.find().then(function(data){
   res.render('admin/users/danhsach', {data: data});
 });
   
});
// Register
router.post('/site/page/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('site/page/register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('site/page/register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/site/page/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
//remove user
router.get('/:id/xoa-user.html',function(req, res, next) {
	
	User.findById(req.params.id).remove(function() { 
		req.flash('success_msg', 'Đã Xoá Thành Công');
		res.redirect('/admin/users/danh-sach.html');
	});
});
// Login
router.post('/site/page/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/site/page/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/site/page/login');
});

module.exports = router;
