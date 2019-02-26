var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')

function	staticRoot(staticPath, req, res){
	console.log(req.url)
	var pathObj = url.parse(req.url, true)
	var filePath = path.join(staticPath, pathObj.pathname)
	fs.readFile(filePath, 'binary', function(err, fileContent){
		if(err){
			console.log('404')
			res.writeHead(404, 'not found')
			res.end('<h1>404 Not Found</h1>')
		}else{
			console.log('ok')
			res.writeHead(200, 'ok')
			res.write(fileContent, 'binary')
			res.end()
		}
	})
}
console.log('dirname:'+__dirname)
var server = http.createServer(function(req, res){
	var pathObj = url.parse(req.url, true)
	console.log(pathObj)
	staticRoot(path.join(__dirname), req, res) 
})
server.listen(8080)