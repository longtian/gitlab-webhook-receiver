var socket = new WebSocket('ws://{host}');
socket.onmessage = function (msg) {
  var data = JSON.parse(msg.data);
  Notification.requestPermission(function () {
    var instance;
    var ACTIONS = {
      'open': '创建',
      'close': '关闭',
      'update': '更新',
      'reopen': '重新开启'
    };

    switch (data.object_kind) {
      case 'push':
        instance = new Notification(data.ref.replace('refs/heads/', ''), {
          body: data.user_name + '推了代码，包含' + data.total_commits_count + '个提交'
        });
        break;
      case 'tag_push':
        instance = new Notification(data.user_name + '创建了标签', {
          body: data.ref.replace('refs/tags/', '')
        });
        break;
      case 'issue':
        instance = new Notification(data.user.name + ACTIONS[data.object_attributes.action] + '了问题:', {
          body: '#' + data.object_attributes.iid + ' ' + data.object_attributes.title,
          icon: data.user.avatar_url
        });
        break;
      case 'merge_request':
        instance = new Notification(data.user.name + ACTIONS[data.object_attributes.action] + '提交了合并请求:', {
          body: '#' + data.object_attributes.iid + ' ' + data.object_attributes.title,
          icon: data.user.avatar_url
        });
        break;
      default:
        break;
    }

    setTimeout(function () {
      instance.close();
    }, 5000);
  });
}