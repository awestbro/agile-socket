var express = require("express");
var app = express();
var port = 3700;

app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render('page');
})

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
	socket.emit('message', { message: 'Welcome to the Story board!' });
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
});

console.log('Listening on port ' + port);
console.log('Shutdown server with Ctrl + C');
