var client = mqtt.connect("mqtt://134.173.206.85", {port:8883});

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
    UpdateMath(message);
  }
});
