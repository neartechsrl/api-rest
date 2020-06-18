/*
MIT License

Copyright (c) 2020 Neartech Developers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var http = require('follow-redirects').http;
var url;
var port;
var user;
var pwd;

/* Helper Functions */
function _get(_path, _query, _callback) {
	
	var path = _path;
	var i=0;
	for (var key in _query) {
		path +=  (i==0? '?': '&') + key + '=' + _query[key]
		i++;
	}
	
	var options = {
	  'method': 'GET',
	  'hostname': url,
	  'port': port,
	  'path': path,
	  'headers': {
		'Authorization': 'Basic ' + new Buffer.from(user + ':' + pwd).toString('base64')
	  },
	  'maxRedirects': 20
	};

	var req = http.request(options, function (res) {
	  var chunks = [];

	  res.on("data", function (chunk) {
		chunks.push(chunk);
	  });

	  res.on("end", function (chunk) {
		var body = Buffer.concat(chunks);
		_callback( JSON.parse(body.toString()) );
	  });

	  res.on("error", function (error) {
		callback( JSON.parse("{'error': 'error'}") );
	  });
	});
	req.end();
    
}

function _post(_path, _data, _callback) {
	
	var data = JSON.stringify(_data);
	
	var options = {
	  'method': 'POST',
	  'hostname': url,
	  'port': port,
	  'path': _path,
	  'headers': {
		'Authorization': 'Basic ' + new Buffer.from(user + ':' + pwd).toString('base64'),
		'Content-Type': 'application/json; charset=UTF-8',
		'Content-Length': data.length
	  },
	  'maxRedirects': 20
	};

	var req = http.request(options, function (res) {
	  var chunks = [];

	  res.on("data", function (chunk) {
		chunks.push(chunk);
	  });

	  res.on("end", function (chunk) {
		var body = Buffer.concat(chunks);
		_callback( JSON.parse(body.toString()) );
	  });

	  res.on("error", function (error) {
		callback( JSON.parse("{'error': 'error'}") );
	  });
	});
	
	req.write(data)
	req.end();
    
}

// Exports
module.exports.configure = function (_url, _port, _user, _pwd) {
	url = _url;
	port = _port;
	user = _user;   
	pwd = _pwd; 
}

// GET
module.exports.login = function (_callback) {
	_get('/login', {}, _callback);
}

module.exports.cliente = function (_params, _callback) {
	_get('/cliente', _params, _callback);
}

module.exports.clientes = function (_params, _callback) {
	_get('/clientes', _params, _callback);
}

module.exports.articulo = function (_params, _callback) {
	_get('/articulo', _params, _callback);
}

module.exports.articulos = function (_params, _callback) {
	_get('/articulos', _params, _callback);
}

module.exports.consulta_comprobantes = function (_params, _callback) {
	_get('/consulta_comprobantes', _params, _callback);
}

module.exports.clasificador = function (_params, _callback) {
	_get('/clasificador', _params, _callback);
}

module.exports.arbol_clasificador = function (_params, _callback) {
	_get('/arbol_clasificador', _params, _callback);
}

// POST
module.exports.pedido = function (_data, _callback) {
	_post('/pedido', _data, _callback);
}

module.exports.comprobante = function (_data, _callback) {
	_post('/comprobante', _data, _callback);
}

module.exports.comprobante = function (_data, _callback) {
	_post('/comprobante', _data, _callback);
}
