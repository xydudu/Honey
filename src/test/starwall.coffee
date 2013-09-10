http = require('http')
querystring = require 'querystring'
http.createServer((req, res)->
    

    res.writeHead 200, {'Content-Type': 'text/plain'}
    
    req.url.replace(/jsoncallback\=([^\&]+)/gi, (_a, _b)->
        fun = _b

        #querys = querystring.parse(req.url)
        #
        #fun = for k, v of querys
        #    v

        
        json = JSON.stringify [
            {id: "1", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "3", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"},
            {id: "2", src: "http://honey.hunantv.com/hunantv.new/image/img/img48.jpg", name: "向世明"}
        ]
        if fun isnt '' then res.end "#{fun}(#{json});"

    )

).listen(1337, '127.0.0.1')
