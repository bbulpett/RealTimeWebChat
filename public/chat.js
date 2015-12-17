// load all the markups and external javascripts
window.onload = function() {

	var messages = []; // Array to store the messages
	var socket = io.connect('http://localhost:3700'); // New socket object
	// DOM shortcuts
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");

	// Function that reacts to the socket's activity (expects a message)
	socket.on('message', function (data) {
		if(data.message) {
			messages.push(data.message); // Store message in the array

			var html = '';
			for (var i=0; i<messages.length; i++) {
				html += messages[i] + '<br />'; 
			}
			content.innerHTML = html; // Update the "content" div with new message
		} else {
				console.log("There is a problem:", data);
		}
	});

	// Logic for sending message
	sendButton.onclick = function() {
		var text = field.value;
		socket.emit('send', { message: text });
	};
}