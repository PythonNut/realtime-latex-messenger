var client = mqtt.connect("mqtt://134.173.206.85", {port:8883});
var state = 1;
var username = "";
client.on('connect', function () {
  client.subscribe('presence');
  client.subscribe('message');
  client.subscribe('latex');
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
  }
});

myupdate = function(string){
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
