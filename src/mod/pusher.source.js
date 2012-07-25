// Lian Hsueh 7.20/2012
//

honey.def('lib_socket', function(H) {
    'use strict';
    var api = function(configs, fun) {
        var socket = io.connect(configs.socket);
        socket.emit('client-session', configs.data);
        socket.on('add_user', function(_user) {
            //$('<p />').html(_user +' is online.').appendTo('body'); 
        }); 
        socket.on('connect', function() {
            //console.log(socket.socket.sessionid);
        });
        return fun(socket);
    };
    
    H.pusher = api;
});
