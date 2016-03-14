var redis = require("redis");
var db = redis.createClient();

module.exports = Entity;

function Entity(obj){
    for (var key in obj){
        this[key] = obj[key];
    }
}

Entity.prototype.save = function(fn){
    var entityJSON = JSON.stringify(this);
    db.lpush('entries', entityJSON, function(err){
        if (err) return fn(err);
        fn();
    })
};
Entity.getRange = function(from, to, fn){
    db.lrange('entries', from, to, function(err, items){
        if (err) return fn(err);
        var entries = [];
        items.forEach(function(item){
            entries.push(JSON.parse(item));
        })
        fn(null, entries);
    })
};