var express = require('express');
var router = express.Router();
var Entry = require('../lib/entry');

router.get('/list', function(req, res, next){
    Entry.getRange(0, -1, function(err, entries){
        if (err) return next(err);
        res.render('entries', {
            title: 'Entries',
            entries: entries
        })
    })
});

router.get('/', function(req, res){
    res.render('post', {
        title: 'add post'
    });
})

router.post('/', function(req, res, next){
    var data = req.body;
    var entry = new Entry({
        title: data.title,
        body: data.body
    });

    entry.save(function(err){
        if (err) return next(err);
        res.redirect('/post/list');
    });

});

module.exports = router;