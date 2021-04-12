var connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:58325/messageHub").build();
var groupName;

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("joinButton").addEventListener("click", function(event){
    var group = document.getElementById("groupInput").value;
    groupName = group;
    connection.invoke("JoinGroup", group).catch(function(err){
        return console.error(err.toString());
    });
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    if(groupName != null){
        var user = document.getElementById("userInput").value;
        var message = document.getElementById("messageInput").value;
        connection.invoke("SendMessage", user, message, groupName).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    }else{
        console.log("no");
    }
});
