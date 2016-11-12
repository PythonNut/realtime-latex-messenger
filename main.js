var client = mqtt.connect("mqtt://134.173.206.85", {port:8883});
var state = 1;
var username = "";
client.on('connect', function () {
  client.subscribe('presence');
  client.subscribe('message');
  client.subscribe('latex');
  client.subscribe('push');
  client.publish('presence', 'Hello mqtt');
});

client.on('message', function (topic, message) {
  // message is Buffer
  if (topic === "message") {
    alert(message);
  } else if (topic === "latex") {
    var object = JSON.parse(message);
    if (object.username === username) {
      Preview.Update('MathPreviewOurs', 'MathBufferOurs', object.message);
    } else {
      Preview.Update('MathPreviewTheirs', 'MathBufferTheirs', object.message);
    }
  } else if (topic === "push") {
    console.log("Pushing"+message+username);
    if (message == username) {
      console.log("Pushing own comment");
      document.getElementById("MathInput").value = "";
      var html = $("#MathPreviewOurs").html();
      var buffer = $("#MathBufferOurs").html();
      if (buffer.length > html.length) {
        html = buffer;
      }
      $("#MathPreviewOurs").html("");
      var element = $('<div class="message mine"></div>');
      element.html(html);
      $("#ChatHistory").append(element);
    } else {
      console.log("Pushing other comment");
      var html = $("#MathPreviewTheirs").html();
      var buffer = $("#MathBufferTheirs").html();
      if (buffer.length > html.length) {
        html = buffer;
      }
      $("#MathPreviewTheirs").html("");
      var element = $('<div class="message theirs"></div>');
      element.html(html);
      $("#ChatHistory").append(element);
    }
    $('#ChatHistory').scrollTop($('#ChatHistory')[0].scrollHeight);
  }
});

myupdate = function(string){
  if (username == "") {
    alert("Please login!");
    return
  }
  console.log("hi" + string);
  var object = {
    username: username,
    message: string
  };
  client.publish('latex', JSON.stringify(object));
};

$(function (){
  Preview.Init();
});

setusername = function() {
  username = document.getElementById("username").value;
};

push = function() {
  console.log("Initiating push for " + username);
  client.publish('push', username);
};
