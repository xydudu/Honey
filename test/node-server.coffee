###
    node.js server for testing 
    
    http://localhost:3000/foo?value=1&time=200
    
    --> (after 200ms) : var foo = 1;
###

http = require "http"
request = require 'request'

server = (req, res)->
    #url = require('url').parse(req.url, true)
    #params = url.query || {}
    #head = { 'Content-Type': 'text/javascript' }
    #value = params.value ? url.pathname.slice(1) + " = " + params.value + ";" : ""
    #
    #if (!params.nocache)
    #    head.Expires = 'Thu, 31 Dec 2037 23:55:55 GMT'
    #    head['Cache-Control'] = 'max-age=315360000'
    #
    #res.writeHead 200, head
    #
    #
    #if (params.require)
    #    value = "if (typeof " + params.require + " != 'undefined' ) { " + value + "}"
    #
    #delay = if params.time then 1 * params.time else 0
    #setTimeout (-> res.end value), delay
    #http.createServer(function (req, resp) {
    root = 'http://honey.hunantv.com/src'
    path = "#{root}/#{req.url}"
    delay = Math.random()*500
    setTimeout (-> request.get(path).pipe(res)), delay
    #res.end req.url
    #if (req.url === '/doodle.png')
    #  if (req.method === 'PUT')
    #    req.pipe(request.put('http://mysite.com/doodle.png'))
    #  else if (req.method === 'GET' || req.method === 'HEAD') {
    #    request.get('http://mysite.com/doodle.png').pipe(resp)

http.createServer(server).listen 3000
