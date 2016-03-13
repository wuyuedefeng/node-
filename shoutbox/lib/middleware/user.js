var User = require('../user');
module.exports = function(req, res, next){
    var uid = req.session.uid;
    if(!uid) return next();
    User.getUserById(uid, function(err, user){
        if (err) return next(err);
        console.log('username:' + user.name);
        req.user = res.locals.user = user;
        next();
    })
}