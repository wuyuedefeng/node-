var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    //res.send('1111');
    res.locals.messages = res.locals.messages || [];
    res.render('register', {title: '测试'});
});

var User = require('../lib/user');
router.post('/', function(req, res){
    console.log('=====');
    var data = req.body;
    User.getUserByName(data.name, function(err, user){
        if(err) return next(err);
        if (user.id){
            res.error('username already taken!');
            res.redirect('/');
        }else {
            user = new User({
                name: data.name,
                pass: data.pass
            });
            user.save(function(err){
                if (err) return next(err);
                req.session.uid = user.id;
                res.redirect('/');
            })
        }
    });
    //next();
})


module.exports = router;