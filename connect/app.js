var connect = require('connect');
var app = connect();

function logger(req, res, next){
    console.log('%s %s', req.method, req.url);

    next();

}
app.use(logger);


function restrict(req, res, next){
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));

    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64').toString().split(':');
    var user = auth[0];
    var password = auth[1];
    console.log('user: %s\n password: %s', user, password);
    next();
}
app.use('/admin', restrict);

function admin(req, res, next){
    console.log(1111,req.url);
    switch (req.url){
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jane']));
            break;
    }
}
app.use('/admin', admin);


function hello(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}
app.use(hello);
app.listen(4444);