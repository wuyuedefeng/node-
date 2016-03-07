var http = require('http');
var server = http.createServer(function(req, res){
    var url = 'http://google.com';
    var body = '<div><a href="http://google.com">定位</a></div>'
    res.setHeader('Location', url);
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/html');
    res.end(body);
});
server.listen(3333);
