var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log('id:' + req.session.uid);
    res.render('login', {title: '登录'});
});


var User = require('../lib/user');

router.post('/', function(req, res, next){
    var data = req.body;
    User.authenticate(data.username, data.pass, function(err, user){
        if (err) return next(err);
        if (user){
            req.session.uid = user.id;
            res.redirect('/');
        }else {
            res.error("sorry! invalid credentials.");
            res.redirect('back');
        }
    })
});

module.exports = router;