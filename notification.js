var socket = new WebSocket('ws://{host}');
socket.onmessage = function (msg) {
  var data = JSON.parse(msg.data);
  Notification.requestPermission(function () {
    var message = data.user_name;
    switch (data.object_kind) {
      case 'push':
        message += '提交了代码';
        break;
      case 'tag_push':
        message += '创建了Tag';
        break;
      case 'issue':
        message += '创建了问题';
        break;
      case 'push':
        message += '提交了合并请求';
        break;
      default:
        break;
    }
    var instance = new Notification(data.repository.name, {
      body: message
    });
    setTimeout(function () {
      instance.close();
    }, 1000);
  });
}