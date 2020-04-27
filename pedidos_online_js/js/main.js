/*
  Project Manager - REST API
  Fecha: 23.01.2019
  Programado por Miguel S. Lucero - miguel.sandro@gmail.com  
*/

var debug = 0; // activar TEST
var version = '20.3.27'; // versión app. miguel@01.07.19
var url_server = '';
var user = '';
var password = '';
var dlg_articulo; 
var dlg_pdf;

var data; // datos
var perfil = null; // perfil usuario
var sel_cliente = null; // datos cliente seleccionado
var codigo_cliente = ""; // código cliente seleccionado
var detalle_pedido = []; // detalle pedido
var codigo_articulo = ""; // código artículo seleccionado
var sel_detalle = -1; // indice detalle seleccionado
var total = 0.0;
var cantidad = 0.0;
var tipo_comprobante = ""; // tipo de comprobante PED, COT, FAC
var dic_tipo_comp = {
	"PED": {
		"titulo": "Pedido",
		"url": "/pedido"
	},
	"COT": {
		"titulo": "Cotización",
		"url": "/cotiza"
	},
	"FAC": {
		"titulo": "Facturación",
		"url": "/comprobante"
	},
	"REM": {
		"titulo": "Remito",
		"url": "/remito"
	}
	
}

// constantes
const NONE = 1000;
const BLANK = "&nbsp;";

// Funciones helper

function fillState(data, _sele) {
	var $select = $('#' + _sele);
    options = [];
    $.each(data, function(i , value) {
         options.push('<option value="'+ value.id_estado+'">'+ value.id_estado +'</option>');
    });
    $select.html(options.join(""));	
}

function activarOpcion(_name, _id, _value) {
	// Activar opción
	var ul = document.getElementById(_name);
	var items = ul.getElementsByTagName("li");
	$.each(items, function(i , value) {
		$(value).removeClass('active');
		if( $(value).attr(_id) == _value ) {
			$(value).addClass('active');
		} 
	});	
}

function getNum(value) {
	result = parseFloat(value);
	if ( isNaN(result) ) {
		return 0.0;
	} else {
		return result;
	}
}

function intNum(value) {
	result = parseInt(value);
	if ( isNaN(result) ) {
		return 0;
	} else {
		return result;
	}
}

function setFocusHelper(_titulo, _detalle) {	
	tinyMCE.get(_detalle).focus(); // se usa para activar letra x defecto.
	document.getElementById(_titulo).focus(); // titulo siempre activo por primera vez
}

function convertToPlain(rtf) {
    rtf = rtf.replace(/\\par[d]?/g, "");
    rtf = rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
    return rtf.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim();
}

/**
 * Retorna fecha actual en formato compatible con SQLite
 *   yyyy-mm-dd
 */
function getSQLDate() {
	var date = new Date();
	var yy = date.getFullYear();
	var mm = date.getMonth() + 1;
	var dd = date.getDate();
	return yy.toString() + '-' + ("0" + mm).slice(-2) + '-' + ("0" + dd).slice(-2);
}

/**
 * Retorna fecha sql, formato yyyy-mm-dd, en formato local dd/mm/yyyy
 */  
function getDate(sql_date) {
	var date = new Date(sql_date.replace(/[^a-zA-Z0-9]/g, '/') );
	var yy = date.getFullYear();
	var mm = date.getMonth() + 1;
	var dd = date.getDate();
	return ("0" + dd).slice(-2) + '/' + ("0" + mm).slice(-2) + '/' + yy.toString();
}

// API REST
function _get(url, funcCallback) {		 
	var auth = "Basic " + btoa( user + ":" + password);
	var data = null;
	var xhr = new XMLHttpRequest();	
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			if ( this.status == 200 ) {
				funcCallback( JSON.parse(this.responseText), false );
			} else {
				funcCallback( null, true ); // error
			}
		}
	});

	/*
	xhr.onload = function () {
		console.log('DONE: ', xhr.status);
	};
	*/
	
	xhr.open("GET", url);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.setRequestHeader("Authorization", auth);
	xhr.send(data);
}	

function _post(url, data, funcCallback ) {		
	var auth = "Basic " + btoa( user + ":" + password);
	var xhr = new XMLHttpRequest();	
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			if ( this.status == 200 || this.status == 201 ) {
				funcCallback( JSON.parse(this.responseText), false );
			} else {
				funcCallback( null, true ); // error
			}
		}
	});

	/*
	xhr.onload = function () {
		console.log('DONE: ', xhr.status);
	};
	*/
	
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.setRequestHeader("Authorization", auth);
	xhr.send(data);
}	

function login() {
	user = document.getElementById('username').value.toUpperCase();
	password = document.getElementById('password').value;

	var url = url_server + "/login";
	_get(url, function(data, error) {
		if ( !error ) {
			perfil = data;
			
			refreshUser();

			// llenar combos
			// talonarios
			var $select = $('#cbo_talonario');
    		options = [];
    		$.each(perfil.talonarios, function(i , value) {
         		options.push('<option value="'+ value.talonario +'">'+ value.desc_talonario +'</option>');
    		});
			$select.html(options.join(""));	
			
			// transportes
			var $select = $('#cbo_transporte');
    		options = [];
    		$.each(perfil.transportes, function(i , value) {
         		options.push('<option value="'+ value.codigo_transporte +'">'+ value.desc_transporte +'</option>');
    		});
			$select.html(options.join(""));	

			// depósitos
			var $select = $('#cbo_deposito');
    		options = [];
    		$.each(perfil.depositos, function(i , value) {
         		options.push('<option value="'+ value.codigo_deposito +'">'+ value.desc_deposito +'</option>');
    		});
			$select.html(options.join(""));	

			// depósitos
			var $select = $('#cbo_lista');
    		options = [];
    		$.each(perfil.listas_precio, function(i , value) {
         		options.push('<option value="'+ value.numero_lista +'">'+ value.desc_lista +'</option>');
    		});
			$select.html(options.join(""));	

			// mostrar main
			$('#login').hide();
			$('#main').show();		

			iniciarPantalla();
			
		} else {
			alert("Login Incorrecto. Verifique los datos ingresados");
		}
	});	
}

function refreshUser() {
	sessionStorage.clear();
	sessionStorage.setItem('usuario', user );
	sessionStorage.setItem('nombre', user );
		
	document.getElementById('user').innerHTML = sessionStorage.getItem('nombre');	
}

function iniciarPantalla() {
	
	sel_cliente = null;
	codigo_cliente = "";
	detalle_pedido = [];
	codigo_articulo = "";
	sel_detalle = -1;
	total = 0.0;
	cantidad = 0.0;
	tipo_comprobante = "";
	document.getElementById('info_comprobante').innerHTML = "";

	calculo();
	
	// mostrar buscar clientes
	hideDiv()
	$('#div_clientes').show();

	// botones
	$('#btnCancelar').hide();
	$('#btnPedido').show();
	$('#btnCotiza').show();
	$('#btnFactura').show();
	$('#btnRemito').show();
	$('#btnConsulta').show();
	$('#btnBuscar').hide();
	$('#btnArticulo').hide();
	$('#btnGrabar').hide();

	// focus
	document.getElementById("search_client").focus();		

}

function buscarClientes() {
	$("#lista_clientes").empty(); // borrar lista de selección
	var texto = document.getElementById('search_client').value;

	if ( texto != '' ) {
		document.getElementById('search_client').value = '';
		var url = url_server + "/clientes?codigo_perfil=" + perfil.codigo_perfil + "&q=" + texto;
		_get(url, function(data, error) {
			if( ! error ) {
				
				var $ul = $("#lista_clientes");
				$ul.empty();
				
				$.each(data, function(i , value) {
					direccion = value.domicilio + '<br>';
					if ( value.localidad != '' ) direccion += value.localidad + '<br>';
					if ( value.desc_provincia != '' ) direccion += value.desc_provincia + '<br>';
					if ( value.desc_pais != '' ) direccion += value.desc_pais + '<br>';
					
					info = '';							
					if ( value.telefono_1 != '' ) info += value.telefono_1 + '<br>';
					if ( value.telefono_2 != '' ) info += value.telefono_2 + '<br>';
					if ( value.e_mail != '' ) info += value.e_mail + '<br>';
					if ( value.observaciones != '' ) info += value.observaciones + '<br>';
					
					content = '<li codigo_cliente = "' + value.codigo_cliente + '" onclick="onClickSelCliente(' + "'" + value.codigo_cliente + "'" + ')"><a href="#">' 
						+ '<div class="row">'
						+ '  <div class="col-md-1">' + value.codigo_cliente + '</div>'
						+ '  <div class="col-md-3">' + value.nombre_cliente + '</div>'
						+ '  <div class="col-md-3">' + direccion + '</div>'
						+ '  <div class="col-md-4">' + info + '</div>'
						+ ' </div>'
						+ '</a></li>'; 
					$ul.append(content);
				});						
				
			}
		});				
	}	
}

function onClickSelCliente(_value) {
	codigo_cliente = _value; // seleccionar cliente
	activarOpcion("lista_clientes", "codigo_cliente", _value);
}

function pedidoCliente(_value) {
	if( _value != '' ) {
		var url = url_server + "/cliente?codigo_perfil=" + perfil.codigo_perfil + "&codigo_cliente=" + _value;
		_get(url, function(data, error) {
			if( !error ) {		
				sel_cliente = data; // datos cliente seleccionado
				detalle_pedido = []; // detalle pedido vacio
				
				// Datos Cliente
				document.getElementById('et_cliente').innerHTML = sel_cliente.codigo_cliente + " - " + sel_cliente.nombre_cliente;

				// Fecha
				var fecha1 = new Date();
				fecha1.setDate(fecha1.getDate());
				document.getElementById('ed_fecha').value = fecha1.toISOString().slice(0,10); 

				// talonarios según tipo comprobante
				var $select = $('#cbo_talonario');
				options = [];
				$.each(perfil.talonarios, function(i , value) {
					if ( value.tipo_comprobante == tipo_comprobante ) {
						options.push('<option value="'+ value.talonario +'">'+ value.desc_talonario +'</option>');
					}
				});
				$select.html(options.join(""));

				// condición venta. Si es FAC solo cta. cte. miguel@14.11.19
				var $select = $('#cbo_condicion');
				options = [];
				$.each(perfil.condiciones_venta, function(i , value) {
					if ( ( tipo_comprobante == 'FAC' && value.contado == 'N' ) || tipo_comprobante != 'FAC' ) {
						options.push('<option value="'+ value.codigo_condicion +'">'+ value.desc_condicion +'</option>');
					}
				});
				$select.html(options.join(""));	

				// titulo tipo comprobante
				document.getElementById('info_comprobante').innerHTML = dic_tipo_comp[tipo_comprobante].titulo;

				// botones
				$('#btnCancelar').show();
				$('#btnPedido').hide();
				$('#btnCotiza').hide();
				$('#btnFactura').hide();
				$('#btnRemito').hide();
				$('#btnConsulta').hide();
				$('#btnBuscar').hide();
				$('#btnArticulo').show();
				$('#btnGrabar').show();

				// iniciar pedido/cotiza/factura
				hideDiv();
				$('#div_pedido').show();
			}
		});		
	}
}

function buscarArticulos() {
	$("#lista_articulos").empty(); // borrar lista de selección
	var texto = document.getElementById('buscar_articulo').value;

	if ( texto != '' ) {
		document.getElementById('buscar_articulo').value = '';
		var numero_lista = document.getElementById('cbo_lista').value;
		var url = url_server + "/articulos?codigo_perfil=" + perfil.codigo_perfil + "&numero_lista=" + numero_lista + "&q=" + texto + "&binary_img=1" + "&size_img=48";
		_get(url, function(data, error) {
			if( ! error ) {
				
				var $ul = $("#lista_articulos");
				$ul.empty();				
				$.each(data, function(i , value) {	
					var precio_pan = value.precio * value.equivalencia;
					if( value.dum == 1 && value.equivalencia_stock_2 > 0 ) precio_pan *= value.equivalencia_stock_2; // DUM. miguel@07.10.19

					if( value.incluye_iva == 0) precio_pan *= ( 1 + value.porcentaje_iva / 100 );
					if( value.incluye_ii == 0 ) precio_pan *= ( 1 + value.porcentaje_ii / 100 );
						
					var multi = Math.pow(10,2);
					precio_pan = Math.round(precio_pan * multi) / multi;
		
					var img = "";
					if ( value.foto != "" ) img = '<img src="' + value.foto + '" height="48" width="48">';

					content = '<li codigo_articulo = "' + value.codigo_articulo + '" onclick="onClickSelArticulo(' + "'" + value.codigo_articulo + "'" + ')"><a href="#">' 
						+ '<div class="row">'
						+ '  <div class="col-md-1">' + img + '</div>'
						+ '  <div class="col-md-2">' + value.codigo_articulo + '</div>'
						+ '  <div class="col-md-4">' + value.desc_articulo + '</div>'
						+ '  <div class="col-md-3">' + value.adicional + '</div>'						
						+ '  <div class="col-md-1">' + value.unidad_medida_ventas + '</div>'
						+ '  <div class="col-md-1"><span style="float: right;">' + precio_pan.toFixed(2) + '</span></div>'
						+ ' </div>'
						+ '</a></li>'; 
					$ul.append(content);

				});						
				
			}
		});				
	}	
}

function onClickSelArticulo(_value) {
	codigo_articulo = _value; // seleccionar cliente
	activarOpcion("lista_articulos", "codigo_articulo", _value);
}

function agregarArticulo(_value) {
	if( _value != '' ) {
		var numero_lista = document.getElementById('cbo_lista').value;
		var url = url_server + "/articulo?codigo_perfil=" + perfil.codigo_perfil + "&numero_lista=" + numero_lista + "&codigo=" + _value + "&binary_img=1" + "&size_img=64";
		_get(url, function(data, error) {
			if( !error ) {						
				data["cantidad"] = 1.0;
				data["descuento"] = 0.0;
				detalle_pedido.push(data);
				calculo();
				document.getElementById("buscar_articulo").focus();
			}
		});		
	}
}

function calculo() {
	total = 0.0;
	cantidad = 0.0;

	var $ul = $("#lista_detalle");
	$ul.empty();				
	$.each(detalle_pedido, function(i , value) {	
		var precio_pan = value.precio * value.equivalencia;
		if( value.dum == 1 && value.equivalencia_stock_2 > 0 ) precio_pan *= value.equivalencia_stock_2; // DUM. miguel@07.10.19

		if( value.incluye_iva == 0) precio_pan *= ( 1 + value.porcentaje_iva / 100 );
		if( value.incluye_ii == 0 ) precio_pan *= ( 1 + value.porcentaje_ii / 100 );
			
		var multi = Math.pow(10,2);
		precio_pan = Math.round(precio_pan * multi) / multi;

		cantidad += value.cantidad;
		total += precio_pan * value.cantidad;

		var img = "";
		if ( value.foto != "" ) img = '<img src="' + value.foto + '" height="64" width="64">';

		content = '<li>' 
			+ '  <div class="row">'
			+ '    <div class="col-md-1">' + img + '</div>'
			+ '    <div class="col-md-1">' + value.codigo_articulo + '</div>'
			+ '    <div class="col-md-3">' + value.desc_articulo + '</div>'
			+ '    <div class="col-md-1">' + value.unidad_medida_ventas + '</div>'
			+ '    <div class="col-md-1"><span style="float: right;">' + value.cantidad.toFixed(2) + '</span></div>'
			+ '    <div class="col-md-1"><span style="float: right;">' + precio_pan.toFixed(2) + '</span></div>'
			+ '    <div class="col-md-1"><span style="float: right;">' + (precio_pan * value.cantidad).toFixed(2) + '</span></div>'
			+ '    <div class="col-md-1">'
			+ '	       <span class="glyphicon glyphicon-plus" onclick="sumarDetalle(' + i + ')"></span>&nbsp;'
			+ '	       <span class="glyphicon glyphicon-minus" onclick="restarDetalle(' + i + ')"></span>&nbsp;'
			+ '	       <span class="glyphicon glyphicon-trash" onclick="borrarDetalle(' + i + ')"></span>&nbsp;'
			+ '    </div>'
			+ '  </div>'
			+ '</li>'; 
		$ul.append(content);

	});	
	
	// Mostrar totales
	document.getElementById('et_cantidad').innerHTML = cantidad.toFixed(2)
	document.getElementById('et_total').innerHTML = total.toFixed(2)
}

function sumarDetalle(_indice) {
	detalle_pedido[_indice].cantidad += 1;
	calculo();
}

function restarDetalle(_indice) {
	if ( detalle_pedido[_indice].cantidad > 1 )	detalle_pedido[_indice].cantidad -= 1;
	calculo();
}

function borrarDetalle(_indice) {
	detalle_pedido.splice( _indice, 1 );
	calculo();
}

function infoDetalle(_indice) {
	console.log("infoDetalle: " + _indice);
}

function onClickDetalle(_value) {
	sel_detalle = _value; // seleccionar detalle
	activarOpcion("lista_detalle", "index", _value);
}

function grabarPedido() {
	if( detalle_pedido.length > 0 ) {
		var pedido = {
			codigo_perfil: perfil.codigo_perfil,
			codigo_cliente: sel_cliente.codigo_cliente,	
			talonario: intNum( document.getElementById('cbo_talonario').value ),
			fecha: getDate( document.getElementById('ed_fecha').value ),
			codigo_vendedor: perfil.codigo_vendedor,
			codigo_condicion: intNum( document.getElementById('cbo_condicion').value ),
			codigo_transporte: document.getElementById('cbo_transporte').value,
			codigo_deposito: document.getElementById('cbo_deposito').value,
			numero_lista: intNum( document.getElementById('cbo_lista').value),
			leyenda_1: "",
			leyenda_2: "",
			leyenda_3: "",
			leyenda_4: "",
			leyenda_5: "",
			total: total,
			detalle: detalle_pedido
		};  	  
	  	  
		// var url = url_server + "/pedido";
		var url = url_server + dic_tipo_comp[tipo_comprobante].url;

		_post(url, JSON.stringify(pedido), function(data, error) {			
			if( !error ) {
				if ( data.pdf == '' ) {
					alert("Se grabó correctamente el comprobante nº " + data.numero_comprobante);
				} else {
					showPDFBase64(tipo_comprobante, data.pdf)
				}
				iniciarPantalla();
			}
		});

	}
}

function consultaComprobantes() {
	var fecha_desde = getDate( document.getElementById('ed_fecha_d').value );
	var fecha_hasta = getDate( document.getElementById('ed_fecha_h').value );
	var tipo_comprobante = document.getElementById('cbo_tipo').value;

	var url = url_server + "/consulta_comprobantes?codigo_perfil=" + perfil.codigo_perfil 
		+ "&fecha_desde=" + fecha_desde 
		+ "&fecha_hasta=" + fecha_hasta 
		+ "&tipo_comprobante=" + tipo_comprobante;
	_get(url, function(data, error) {
		if( !error ) {						
			var $ul = $("#lista_consulta");
			$ul.empty();				
			$.each(data, function(i , value) {	
				content = '<li>' 
					+ '  <div class="row">'
					+ '    <div class="col-md-2">' + value.fecha + '</div>'
					+ '    <div class="col-md-2">' + value.numero_comprobante + '</div>'
					+ '    <div class="col-md-3">' + value.nombre_cliente + '</div>'
					+ '    <div class="col-md-1"><span style="float: right;">' + value.total.toFixed(2) + '</span></div>'
					+ '    <div class="col-md-1">'
					+ '	       <span class="glyphicon glyphicon-open-file" onclick="getPDF(' + "'" + value.tipo_comprobante + "', " + value.talonario  + ", '" + value.numero_comprobante + "'" + ')"></span>&nbsp;'
					+ '    </div>'		
					+ '  </div>'
					+ '</li>'; 
				$ul.append(content);
			});	

		}
	});	
}

function getPDF( tipo_comprobante, talonario, numero_comprobante ) {
	var url = url_server + "/pdf_comprobante?codigo_perfil=" + perfil.codigo_perfil 
		+ "&tipo_comprobante=" + tipo_comprobante 
		+ "&talonario=" + talonario 
		+ "&numero_comprobante=" + numero_comprobante;
	_get(url, function(data, error) {
		if( !error ) {						
			if ( data.pdf != '' ) {
				showPDFBase64(data.tipo_comprobante, data.pdf)
			}
		}
	});	

}

// ---------------
function hideDiv() {	
	$('#div_clientes').hide();
	$('#div_pedido').hide();
	$('#div_consulta').hide();	
}

function setPWDStyle() {
	$("#btnPWD").find("span").remove();
	var type = $("#password").attr('type');
	switch (type) {
		case 'password':
		{
			$("#password").attr('type', 'text');						
			document.getElementById('btnPWD').innerHTML = '<span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>';
			return;
		}
		case 'text':
		{
			$("#password").attr('type', 'password');
			document.getElementById('btnPWD').innerHTML = '<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>';			
			return;
		}
	}
}	

// iniciar aplicación
function init_app() {								
	
	if ( debug === 1 ) {
		url_server = 'http://192.168.1.11:3000'; // test
		document.getElementById('username').value = "miguel";
		document.getElementById('password').value = "123456";
		document.getElementById('search_client').value = 'lucero';
	} else {
		url_server = 'http://neartech.dyndns.org:3000'; // SSL
		document.getElementById('username').innerHTML = "";
		document.getElementById('password').innerHTML = "";		
	}
	
	// version 
	document.getElementById('version_login').innerHTML = "versión " + version;
	document.getElementById('version_footer').innerHTML = "versión " + version;
	
	// dialogos
	dlg_articulo = document.getElementById('dlg_articulo');
	dialogPolyfill.registerDialog(dlg_articulo);

	dlg_pdf = document.getElementById("dlg_pdf");
	dialogPolyfill.registerDialog(dlg_pdf);

	hideDiv();
	
	// Login	
	document.getElementById('btnPWD').onclick = function() {
		setPWDStyle()
	}
	
	document.getElementById('btnLogin').onclick = function() {
		login();
	}
	
	// Logout
	document.getElementById('btnLogout').onclick = function() {
		sessionStorage.clear();
		window.location.href = "index.html";			
	};		

	document.getElementById('btnPedido').onclick = function() {
		tipo_comprobante = "PED";
		pedidoCliente(codigo_cliente);
	}	

	document.getElementById('btnCotiza').onclick = function() {
		tipo_comprobante = "COT";
		pedidoCliente(codigo_cliente);
	}	

	document.getElementById('btnFactura').onclick = function() {
		tipo_comprobante = "FAC";
		pedidoCliente(codigo_cliente);
	}	

	document.getElementById('btnRemito').onclick = function() {
		tipo_comprobante = "REM";
		pedidoCliente(codigo_cliente);
	}	

	document.getElementById('btnConsulta').onclick = function() {

		var $select = $('#cbo_tipo');
		options = [];
		options.push('<option value="PED">Pedido</option>');
		options.push('<option value="COT">Cotización</option>');
		options.push('<option value="FAC">Facturación</option>');
		options.push('<option value="REM">Remito</option>');
		$select.html(options.join(""));

		// botones
		$('#btnCancelar').show();
		$('#btnPedido').hide();
		$('#btnCotiza').hide();
		$('#btnFactura').hide();
		$('#btnRemito').hide();
		$('#btnConsulta').hide();
		$('#btnBuscar').show();
		$('#btnArticulo').hide();
		$('#btnGrabar').hide();

		// iniciar pedido/cotiza/factura
		hideDiv();
		$('#div_consulta').show();
	}	

	document.getElementById('btnBuscar').onclick = function() {
		consultaComprobantes();
	}

	document.getElementById('btnArticulo').onclick = function() {
		// buscar artículos
		if( $('#div_pedido').is(":visible") ) {
			$("#lista_articulos").empty();
			dlg_articulo.showModal();
		}
	}	

	document.getElementById('btnAgregar').onclick = function() {
		agregarArticulo(codigo_articulo);
	}

	document.getElementById('btnCerrar').onclick = function() {
		dlg_articulo.close();	
	}

	document.getElementById('btnGrabar').onclick = function() {
		if( $('#div_pedido').is(":visible") ) {
			grabarPedido();
		}
	}

	document.getElementById('btnCancelar').onclick = function() {
		if( $('#div_pedido').is(":visible") || $('#div_consulta').is(":visible") ) {
			iniciarPantalla();
		}
	}
	
	document.getElementById('btnBuscarCliente').onclick = function() {
		buscarClientes();
	}

	document.getElementById('btnBuscarArticulo').onclick = function() {
		buscarArticulos();
	}
		
	// eventos
	var input = document.getElementById("password");
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("btnLogin").click();
		}
	}); 	
	
	// buscar texto en cliente
	var input_1 = document.getElementById("search_client");
	input_1.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			buscarClientes();									
		}
	}); 	

	// buscar artículos	
	var input_2 = document.getElementById("buscar_articulo");
	input_2.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			buscarArticulos();									
		}
	}); 	

	// Siempre Mostrar LOGIN. Por si usuario presionó F5
	$('#login').show();
	$('#main').hide();
	document.getElementById("username").focus();				
	
}

function handleFileSelect (e) {
    var files = e.target.files;
    if (files.length < 1) {
        alert('select a file...');
        return;
    }
    var file = files[0];
    var reader = new FileReader();
    reader.onload = onFileLoaded;
    reader.readAsDataURL(file);
}

function onFileLoaded (e) {
	foto_base64 = e.target.result;
	var preview = document.getElementById("foto");
	preview.setAttribute('src', foto_base64);	    
}

function showPDFBase64(_tipo_comprobante, pdf_base64) {
	if( pdf_base64 == '' ) return;
	
	var objbuilder = '';
	objbuilder += ('<object width="100%" height="100%" data="data:application/pdf;base64,');
	objbuilder += (pdf_base64);
	objbuilder += ('" type="application/pdf" class="internal">');
	objbuilder += ('<embed src="data:application/pdf;base64,');
	objbuilder += (pdf_base64);
	objbuilder += ('" type="application/pdf"  />');
	objbuilder += ('</object>');
	
	var pdf_content = document.getElementById('pdf_content');	
	pdf_content.innerHTML = objbuilder; 

	dlg_pdf.showModal();	
}
