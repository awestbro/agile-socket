window.onload = function() {

	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var $content = $('.content');

	var source   = $("#taskTemplate").html();
	var template = Handlebars.compile(source)

	socket.on('message', function (data) {
		if(data) {
			console.log(data);
			$content.append(template(data));	
		} else {
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = sendMessage = function() {
		var text = field.value;
		var task = text.match(/(\[.*\])(.*)/);
		console.log(task);
		socket.emit('send', { id: task[1], message: task[2]});
		field.value = "";
	};
}



$(document).ready(function() {
	$('#field').keyup(function(e) {
		if(e.which == 13) {
			sendMessage();
		}
	});
});