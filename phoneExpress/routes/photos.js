var express = require('express');
var router = express.Router();

var photos = [];
photos.push({
    name: 'Node is logo',
    path: 'http://nodejs.org/images/llogos/nodejs-green.png'
});
photos.push({
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

router.get('/', function(req, res){
    res.render('photos', {
        title: 'photos',
        photos: photos
    });
});


router.get('/form', function(req, res){
    res.render('form', {
        title: '上传图片'
    });
});





module.exports = router;