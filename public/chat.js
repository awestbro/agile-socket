window.onload = function() {

	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var $content = $('.content');

	socket.on('message', function (data) {
		if(data.message) {
			$content.append('<div class="message">'+data.message+'</div>');	
		} else {
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = sendMessage = function() {
		var text = field.value;
		socket.emit('send', { message: text, username: name.value });
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