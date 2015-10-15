/**
 * Created by wyvernnot on 15-10-14.
 */
var http = require('http');
var express = require('express');
var path = require('path');
var WebSocketServer = require('ws').Server;

var server = http.createServer(requestHandler);
var wss = new WebSocketServer({
  server: server
});

function requestHandler(req, res) {
  if (req.method === 'POST') {
    var buffer = [];
    var contentLength = 0;
    req.on('data', function (data) {
      buffer.push(data);
      contentLength += data.length;
    });
    req.on('end', function () {
      var message = Buffer.concat(buffer, contentLength).toString();
      broadcastMessage(message);
      try {
        var debugObject = {
          xForwardedFor: req.headers['x-forwarded-for'],
          remoteAddress: req.socket.address(),
          url: req.url,
          method: req.method,
          headers: req.headers,
          payload: JSON.parse(message)
        };
        console.log(require('util').inspect(debugObject, {
          colors: true
        }));
      } catch (e) {
        console.error(e);
      }

      res.end();
    });
  } else {
    serveContent(req, res);
  }
}

function broadcastMessage(message) {
  wss.clients.forEach(function (client) {
    client.send(message);
  });
}

function serveContent(req, res) {
  var scriptContent = require('fs').readFileSync('notification.js').toString('utf-8');
  res.setHeader('Content-Type', 'text/javascript');
  res.end(scriptContent.replace('{host}', req.headers.host));
}

server.listen(3001);