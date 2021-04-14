// connect to the server
var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:58325/messageHub").build();
connection.start();

// recieve message function
connection.on("RecieveMessage", function(message, user){
    console.log("new message" + message);
});

// send message to a user specific user
document.getElementById("sendButton").addEventListener("click", function (event) {
    var reciever = document.getElementById("toId").value;
    var message = document.getElementById("messageInput").value;
    var sender = document.getElementById("userInput").value;
    connection.invoke("sendMessageToUser", sender, reciever, message).catch(function(err){
        return console.error(err.toString());
    });
    event.preventDefault();
});
