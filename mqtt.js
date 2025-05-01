<!DOCTYPE html>
<html>
<head>
  <title>線上點餐</title>
  <script src="mqtt.min.js"></script>
</head>
<body>
  <h2>點餐系統</h2>
  <label>桌號: <input type="text" id="table" value="1"></label><br>
  <label>餐點: <input type="text" id="food" value="雞腿飯"></label><br>
  <label>數量: <input type="number" id="qty" value="1"></label><br>
  <button onclick="sendOrder()">送出訂單</button>
  <script>
    // 連到 EMQX WebSocket broker
    // 連接到 MQTT broker，帶入唯一 clientId
const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
  clientId: 'WebOrder-' + Math.random().toString(16).substr(2, 8),
  clean: true
});

    function sendOrder() {
      const order = {
        table: document.getElementById('table').value,
        food: document.getElementById('food').value,
        quantity: parseInt(document.getElementById('qty').value)
      };
      client.publish('restaurant/orders', JSON.stringify(order));
      alert('訂單已送出！');
    }
  </script>
</body>
</html>
