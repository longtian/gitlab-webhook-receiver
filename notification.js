(function bind_gitlab_webhook() {
  "use strict";

  if (!window.WebSocket || !window.Notification) {
    console.warn('Your browser is not latest.');
    return;
  }

  var ACTIONS = {
    'open': '创建',
    'close': '关闭',
    'update': '更新',
    'reopen': '重新开启'
  };

  /**
   * handle message from gitlab
   *
   * @param msg
   */
  function messageHandler(msg) {
    var data = JSON.parse(msg.data);
    Notification.requestPermission(function () {
      var instance;

      switch (data.object_kind) {
        case 'push':
          instance = new Notification(data.repository.name, {
            body: data.user_name + ' 推了 ' + data.total_commits_count + ' 个提交到 ' + data.ref.replace('refs/heads/', '')
          });
          break;

        case 'tag_push':
          instance = new Notification(data.repository.name, {
            body: data.user_name + ' 创建了标签 ' + data.ref.replace('refs/tags/', '')
          });
          break;

        case 'issue':
          var attributes = data.object_attributes;
          instance = new Notification(data.repository.name, {
            body: data.user.name + ACTIONS[attributes.action] + '了问题: #' + attributes.iid + ' ' + attributes.title,
            icon: data.user.avatar_url
          });
          break;

        case 'merge_request':
          var attributes = data.object_attributes;
          instance = new Notification(data.repository.name, {
            body: data.user.name + ACTIONS[attributes.action] + '了合并请求: #' + attributes.iid + ' ' + attributes.title,
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
  };

  // this file can not be used directly, some tags need to be replaced
  var socket = new WebSocket('ws://{host}');
  socket.onmessage = messageHandler;
})();