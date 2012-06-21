
/*
    node.js server for testing 
    
    http://localhost:3000/foo?value=1&time=200
    
    --> (after 200ms) : var foo = 1;
*/

(function() {
  var http, request, server;

  http = require("http");

  request = require('request');

  server = function(req, res) {
    var delay, path, root;
    root = 'http://honey.hunantv.com/src';
    path = "" + root + "/" + req.url;
    delay = Math.random() * 500;
    return setTimeout((function() {
      return request.get(path).pipe(res);
    }), delay);
  };

  http.createServer(server).listen(3000);

}).call(this);
