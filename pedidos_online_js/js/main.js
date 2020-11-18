/*
  
	Copyright 2020 Neartech SRL

	Por la presente se concede permiso, libre de cargos, a cualquier persona que obtenga una copia de este 
	software y de los archivos de documentación asociados (el "Software"), a utilizar el Software sin restricción, 
	incluyendo sin limitación los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, 
	y/o vender copias del Software, y a permitir a las personas a las que se les proporcione el Software a hacer lo mismo, 
	sujeto a las siguientes condiciones:

	El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o partes 
	sustanciales del Software.
	
	EL SOFTWARE SE PROPORCIONA "COMO ESTÁ", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, 
	INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO 
	PARTICULAR E INCUMPLIMIENTO. EN NINGÚN CASO LOS AUTORES O PROPIETARIOS DE LOS DERECHOS DE AUTOR 
	SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN 
	DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, DERIVADAS DE, FUERA DE O EN CONEXIÓN CON EL SOFTWARE 
	O SU USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
 
	Neartech Pedidos Online - REST API
	Fecha: 01.10.2020
	Empresa: Neartech SRL
	Programado por Miguel S. Lucero - miguel.sandro@gmail.com mlucero@neartech.com.ar
	  
*/

/* NOTA: Estos datos van en archivo config.js ***
var debug = 1; // activar TEST
var url_server = 'http://192.168.1.11:3000';
var document_title = 'Neartech Pedidos Online';
*/

var version = '20.11.12';
var user = '';
var password = '';
var nombre_base = ''; 
var nombre_empresa = ''; 

var dlg_articulo; 
var dlg_pdf;
var dlg_cantidad;

var data; // datos
var perfil = null; // perfil usuario
var sel_cliente = null; // datos cliente seleccionado
var codigo_cliente = ""; // código cliente seleccionado
var detalle_pedido = []; // detalle pedido
var codigo_articulo = ""; // código artículo seleccionado
var sel_detalle = -1; // indice detalle seleccionado
var total = 0.0;
var cantidad = 0.0;
var tipo_comprobante = ""; // tipo de comprobante PED, COT, FAC, CRE
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
	"CRE": {
		"titulo": "Crédito",
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
			json_data = null;
			error = true;
			try {
				json_data = JSON.parse(this.responseText);
				error = false;
			} catch (error) {
				console.log(error);
			}
			if ( this.status == 200 ) {
				funcCallback( json_data, error );
			} else {
				funcCallback( json_data, true );
			}
		}
	});
	
	xhr.open("GET", url);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.setRequestHeader("Authorization", auth);
	// *** B xhr.setRequestHeader("Login-UID", login_uid);
	xhr.send(data);
}	

function _post(url, data, funcCallback ) {		
	var auth = "Basic " + btoa( user + ":" + password);
	var xhr = new XMLHttpRequest();	
	xhr.withCredentials = true;
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			json_data = null;
			error = true;
			try {
				json_data = JSON.parse(this.responseText);
				error = false;
			} catch (error) {
				console.log(error);
			}
			if ( this.status == 200 || this.status == 201 ) {
				funcCallback( json_data, error );
			} else {
				funcCallback( json_data, true );
			}
		}
	});
	
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.setRequestHeader("Authorization", auth);
	// *** B xhr.setRequestHeader("Login-UID", login_uid);
	xhr.send(data);
}	

function logout() {
	sessionStorage.clear();
	window.location.href = "index.html";			
	
	/*
	var url = url_server + "/logout";
	_get(url, function(data, error) {
		sessionStorage.clear();
		window.location.href = "index.html";					
	});
	*/ 
}

function getEmpresas() {
	
	user = document.getElementById('username').value.toUpperCase();
	password = document.getElementById('password').value;
	
	var url = url_server + "/empresas";
	_get(url, function(data, error) {
		if ( !error ) {
			var $select = $('#cbo_empresa');
    		options = [];
    		$.each(data, function(i , value) {
         		options.push('<option value="'+ value.nombre_base +'">'+ value.nombre_empresa +'</option>');
    		});
			$select.html(options.join(""));
			
			if( data.length == 1 ) {
				login()
			} else {
				$('#pn_login').hide();
				$('#pn_empresa').show();
			}
		
		} else {
			alert(data.error);
		}
	});	
}

function login() {
	user = document.getElementById('username').value.toUpperCase();
	password = document.getElementById('password').value;
	nombre_base = document.getElementById('cbo_empresa').value;
	nombre_empresa = $("#cbo_empresa option:selected").text(); // miguel@12.11.20
	
	var url = url_server + "/login?nombre_base=" + nombre_base;
	_get(url, function(data, error) {
		if ( !error ) {
			perfil = data;
			// *** B login_uid = perfil.login_uid;
			
			refreshUser();

			// Opciones PED FAC etc.
			var $ul = $("#lista_opciones");
			$ul.empty();
			$.each(Object.keys(dic_tipo_comp), function(i , opcion) {
				$.each(perfil.talonarios, function(i , value) {
					if ( value.tipo_comprobante == opcion ) {
						content = '<li onclick="nuevoComprobante(' + "'" + opcion + "'" + ')"><a tabindex="-1" href="#">' + dic_tipo_comp[opcion].titulo + '</a></li>';
						$ul.append(content);
						return false;
					}
				});	
			});
				
			// llenar combos
			
			// opciones de búsqueda
			var $select = $('#cbo_opcion_busqueda');
    		options = [];
			options.push('<option value="q">Búsqueda Libre</option>');
			options.push('<option value="sinonimo">Sinónimo</option>');
			options.push('<option value="adicional">Desc. Adicional</option>');
			options.push('<option value="codigo_articulo">Código Artículo</option>');
			options.push('<option value="codigo_barra">Código de Barra</option>');
			$select.html(options.join(""));	
			
			// impresoras ip. miguel@24.09.20
			var $select = $('#cbo_impresora');
    		options = [];
    		$.each(perfil.impresoras_ip, function(i , value) {
         		options.push('<option value="'+ value.id_impresora_ip +'">'+ value.descripcion +'</option>');
    		});
			$select.html(options.join(""));	
			var $select = $('#cbo_impresora_consulta');
			$select.html(options.join(""));
			
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

			// vendedores
			var $select = $('#cbo_vendedor');
    		options = [];
    		$.each(perfil.vendedores, function(i , value) {
         		options.push('<option value="'+ value.codigo_vendedor +'">'+ value.nombre_vendedor +'</option>');
    		});
			$select.html(options.join(""));
			
			// mostrar main
			$('#login').hide();
			$('#main').show();		

			iniciarPantalla();
			
		} else {
			alert(data.error);
		}
	});	
}

function refreshUser() {
	sessionStorage.clear();
	sessionStorage.setItem('usuario', user );
	sessionStorage.setItem('nombre', user );		
	document.getElementById('user').innerHTML = sessionStorage.getItem('nombre') + ' [' + nombre_empresa + ']';	
}

function iniciarPantalla() {
	
	sel_cliente = null;
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
	$('#btnOpciones').show();
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
		var url = url_server + "/clientes?nombre_base=" + perfil.nombre_base 
			+ "&codigo_perfil=" + perfil.codigo_perfil 
			+ "&q=" + texto;
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

function nuevoComprobante(_tipo) {
	tipo_comprobante = _tipo;
	pedidoCliente(codigo_cliente);
}

function onClickSelCliente(_value) {
	codigo_cliente = _value; // seleccionar cliente
	activarOpcion("lista_clientes", "codigo_cliente", _value);
}

function setPerfil(_obj, _div, _value) {
	document.getElementById(_obj).disabled = ( _value == 'M' );
	if ( _value == 'O' ) {
		$('#' + _div ).hide();
	} else {
		$('#' + _div ).show();
	}
}
	
function pedidoCliente(_value) {
	if( _value != '' ) {
		var url = url_server + "/cliente?nombre_base=" + perfil.nombre_base 
			+ "&codigo_perfil=" + perfil.codigo_perfil 
			+ "&codigo_cliente=" + _value;
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

				// condición venta. Si es FAC/CRE solo cta. cte. miguel@14.11.19
				var $select = $('#cbo_condicion');
				options = [];
				$.each(perfil.condiciones_venta, function(i , value) {
					if ( ( tipo_comprobante == 'FAC' && value.contado == 'N' ) || ( tipo_comprobante == 'CRE' && value.contado == 'N' ) || ( tipo_comprobante != 'FAC' && tipo_comprobante != 'CRE' ) ) {
						options.push('<option value="'+ value.codigo_condicion +'">'+ value.desc_condicion +'</option>');
					}
				});
				$select.html(options.join(""));	

				// titulo tipo comprobante
				document.getElementById('info_comprobante').innerHTML = dic_tipo_comp[tipo_comprobante].titulo;

				// Editar / Mostrar / Ocultar
				setPerfil('ed_fecha', 'div_fecha', perfil.edita_fecha);
				setPerfil('cbo_talonario', 'div_talonario', perfil.edita_talonario);
				setPerfil('cbo_condicion', 'div_condicion', perfil.edita_condicion_venta);
				setPerfil('cbo_transporte', 'div_transporte', perfil.edita_transporte);
				setPerfil('cbo_deposito', 'div_deposito', perfil.edita_deposito);
				setPerfil('cbo_lista', 'div_lista', perfil.edita_lista_precio);
				setPerfil('cbo_vendedor', 'div_vendedor', perfil.edita_vendedor);
				setPerfil('cbo_impresora', 'div_impresora', perfil.edita_impresora_ip);
				
				// botones
				$('#btnCancelar').show();
				$('#btnOpciones').hide();
				$('#btnConsulta').hide();
				$('#btnBuscar').hide();
				$('#btnArticulo').show();
				$('#btnGrabar').show();

				// iniciar pedido/cotiza/comprobante (FAC/CRE)
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
		var opcion = document.getElementById('cbo_opcion_busqueda').value;
		
		var url = url_server + "/articulos?nombre_base=" + perfil.nombre_base 
			+ "&codigo_perfil=" + perfil.codigo_perfil 
			+ "&numero_lista=" + numero_lista 
			+ "&" + opcion + "=" + texto 
			+ "&binary_img=1" 
			+ "&size_img=48";
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

					content = '<li codigo_articulo = "' + value.codigo_articulo + '" onclick="onClickSelArticulo(' + "'" + value.codigo_articulo + "'" + ')" ondblclick="agregarArticulo(' + "'" + value.codigo_articulo + "'" + ')" ><a href="#">' 
						+ '<div class="row">'
						+ '  <div class="col-md-1">' + img + '</div>'
						+ '  <div class="col-md-6">'
						+ '    <span class="text3">Código: ' + value.codigo_articulo + '</span><br>'
						+ '    <span class="text1">' + value.desc_articulo + '</span><br>' 
						+ '    <span class="text3">Desc. Adic.: ' + value.adicional + '</span><br>'
						+ '    <span class="text3">Sinónimo:    ' + value.sinonimo + '</span><br>'
						+ '    <span class="text3">Unidad Med.: ' + value.unidad_medida_ventas + '</span>'
						+ '  </div>'
						+ '  <div class="col-md-1"><span class="text4" style="float: right;">' + precio_pan.toFixed(2) + '</span></div>'
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
		var cantidad = getNum(document.getElementById("ed_cantidad_busqueda").value);
		if ( cantidad <= 0 ) cantidad = 1.0;
		
		var url = url_server + "/articulo?nombre_base=" + perfil.nombre_base 
			+ "&codigo_perfil=" + perfil.codigo_perfil 
			+ "&numero_lista=" + numero_lista 
			+ "&codigo=" + _value 
			+ "&binary_img=1" + "&size_img=64";
		_get(url, function(data, error) {
			if( !error ) {						
				data["cantidad"] = cantidad;
				data["descuento"] = 0.0;
				detalle_pedido.push(data);
				calculo();
				document.getElementById("buscar_articulo").focus();
				
				// Mostrar mensaje
				document.getElementById("dlg_articulo_msg").innerHTML = '<strong>¡ Se agregó correctamente artículo: ' + data.desc_articulo + ' !</strong>'
				$("#dlg_articulo_msg").show();
				
				var maxTime = 2 * 1000; // n segundos
				var idVar = setInterval(() => { 
					// ocultar mensaje
					$("#dlg_articulo_msg").hide();
					clearInterval(idVar);
				}, maxTime);
	
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

		content = '<li id_detalle = ' + i + ' onclick="onClickSelDetalle(' + i + ')"><a href="#">' 
			+ '  <div class="row">'
			+ '    <div class="col-md-1">' + img + '</div>'
			+ '    <div class="col-md-4">'
			+ '        <span class="text3">Código: ' + value.codigo_articulo + '</span><br>'
			+ '        <span class="text1">' + value.desc_articulo + '</span><br>' 
			+ '        <span class="text3">Desc. Adic.: ' + value.adicional + '</span><br>'
			+ '        <span class="text3">Sinónimo:    ' + value.sinonimo + '</span><br>'
			+ '        <span class="text3">Unidad Med.: ' + value.unidad_medida_ventas + '</span>'			 
			+ '    </div>'
			+ '    <div class="col-md-1"><span style="float: right;">' + value.cantidad.toFixed(2) + '</span></div>'
			+ '    <div class="col-md-1"><span style="float: right;">' + precio_pan.toFixed(2) + '</span></div>'
			+ '    <div class="col-md-1"><span class="text4" style="float: right;">' + (precio_pan * value.cantidad).toFixed(2) + '</span></div>'
			+ '    <div class="col-md-3">'
			+ '	       <span class="glyphicon glyphicon-pencil" onclick="editarCantidad(' + i + ')"></span>&nbsp;'
			+ '	       <span class="glyphicon glyphicon-trash" onclick="borrarDetalle(' + i + ')"></span>&nbsp;'
			+ '    </div>'
			+ '  </div>'
			+ '</a></li>'; 
		$ul.append(content);

	});	
	
	// Mostrar totales
	document.getElementById('et_cantidad').innerHTML = cantidad.toFixed(2);
	document.getElementById('et_total').innerHTML = total.toFixed(2);
}

function onClickSelDetalle(_value) {
	sel_detalle = _value; // seleccionar articulo de detalle
	activarOpcion("lista_detalle", "id_detalle", _value);
}

function editarCantidad(_indice) {
	sel_detalle = _indice;
	document.getElementById('dlg_codigo').innerHTML = detalle_pedido[_indice].codigo_articulo;
	document.getElementById('dlg_descripcion').innerHTML = detalle_pedido[_indice].desc_articulo;
	document.getElementById('ed_cantidad').value = detalle_pedido[_indice].cantidad;
	dlg_cantidad.showModal();
}

function borrarDetalle(_indice) {
	detalle_pedido.splice( _indice, 1 );
	calculo();
}

function onClickDetalle(_value) {
	sel_detalle = _value; // seleccionar detalle
	activarOpcion("lista_detalle", "index", _value);
}

function grabarPedido() {
	if( detalle_pedido.length > 0 ) {
		
		var pedido_det = []; // detalle pedido que se envía al servidor. miguel@22.09.20
				
		$.each(detalle_pedido, function(i , value) {
			var data = {
				codigo_articulo: value.codigo_articulo,
				cantidad: value.cantidad,
				precio: value.precio,
				descuento: value.descuento
			}			
			pedido_det.push(data);			
		});
		
		var pedido = {
			tipo_comprobante: tipo_comprobante,
			codigo_perfil: perfil.codigo_perfil,
			codigo_cliente: sel_cliente.codigo_cliente,	
			talonario: intNum( document.getElementById('cbo_talonario').value ),
			fecha: getDate( document.getElementById('ed_fecha').value ),
			codigo_vendedor: document.getElementById('cbo_vendedor').value, 
			codigo_condicion: intNum( document.getElementById('cbo_condicion').value ),
			codigo_transporte: document.getElementById('cbo_transporte').value,
			codigo_deposito: document.getElementById('cbo_deposito').value,
			numero_lista: intNum( document.getElementById('cbo_lista').value),
			id_impresora_ip: intNum( document.getElementById('cbo_impresora').value ),
			leyenda_1: "",
			leyenda_2: "",
			leyenda_3: "",
			leyenda_4: "",
			leyenda_5: "",
			total: total,
			detalle: pedido_det
		};  	  
	  	  
		var url = url_server + dic_tipo_comp[tipo_comprobante].url + "?nombre_base=" + perfil.nombre_base;

		_post(url, JSON.stringify(pedido), function(data, error) {			
			if( !error ) {
				if ( data.pdf == '' ) {
					alert("Se grabó correctamente el comprobante nº " + data.numero_comprobante);
				} else {
					showPDFBase64(tipo_comprobante, data.pdf)
				}
				iniciarPantalla();
			} else {
				alert("Error al generar comprobante: " + data.error);
			}
		});

	}
}

function consultaComprobantes() {
	var fecha_desde = getDate( document.getElementById('ed_fecha_d').value );
	var fecha_hasta = getDate( document.getElementById('ed_fecha_h').value );
	var tipo_comprobante = document.getElementById('cbo_tipo').value;

	var url = url_server + "/consulta_comprobantes?nombre_base=" + perfil.nombre_base 
		+ "&codigo_perfil=" + perfil.codigo_perfil 
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
					+ '	       <span class="glyphicon glyphicon-print" onclick="imprimirComprobante(' + "'" + value.tipo_comprobante + "', " + value.talonario  + ", '" + value.numero_comprobante + "'" + ')"></span>&nbsp;'
					+ '    </div>'		
					+ '  </div>'
					+ '</li>'; 
				$ul.append(content);
			});	

		}
	});	
}

function getPDF( tipo_comprobante, talonario, numero_comprobante ) {
	var url = url_server + "/pdf_comprobante?nombre_base=" + perfil.nombre_base 
		+ "&codigo_perfil=" + perfil.codigo_perfil 
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

function imprimirComprobante( tipo_comprobante, talonario, numero_comprobante ) {
	var url = url_server + "/typ_comprobante?nombre_base=" + perfil.nombre_base 
		+ "&codigo_perfil=" + perfil.codigo_perfil 
		+ "&tipo_comprobante=" + tipo_comprobante 
		+ "&talonario=" + talonario 
		+ "&numero_comprobante=" + numero_comprobante
		+ "&id_impresora_ip=" + document.getElementById('cbo_impresora_consulta').value;
	_get(url, function(data, error) {
		if( !error ) {						
			if ( data.typ != '' ) {
				console.log(data.typ);
			}
		}
	});	
}

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

	$('#pn_empresa').hide();
	$('#pn_login').show();
	
	document.title = document_title;				
	document.getElementById('titulo_login').innerHTML = document_title;
	
	if ( debug === 1 ) {
		document.getElementById('username').value = "miguel";
		document.getElementById('password').value = "123456";
		document.getElementById('search_client').value = "lucero";
	};
			
	// version 
	document.getElementById('version_login').innerHTML = "versión " + version;
	document.getElementById('version_footer').innerHTML = "versión " + version;
	
	// dialogos
	dlg_articulo = document.getElementById('dlg_articulo');
	dialogPolyfill.registerDialog(dlg_articulo);

	dlg_pdf = document.getElementById("dlg_pdf");
	dialogPolyfill.registerDialog(dlg_pdf);

	dlg_cantidad = document.getElementById("dlg_cantidad");
	dialogPolyfill.registerDialog(dlg_cantidad);

	hideDiv();
	
	// Login	
	document.getElementById('btnPWD').onclick = function() {
		setPWDStyle()
	}
	
	document.getElementById('btnEmpresa').onclick = function() {
		getEmpresas();
	}
	
	document.getElementById('btnLogin').onclick = function() {
		login();
	}
	
	document.getElementById('btnCancelarLogin').onclick = function() {
		$('#pn_empresa').hide();
		$('#pn_login').show();
	}
	
	document.getElementById('btnLogout').onclick = function() {
		logout(); // miguel@13.10.20
		// sessionStorage.clear();
		// window.location.href = "index.html";			
	};		
	
	document.getElementById('btnConsulta').onclick = function() {

		var $select = $('#cbo_tipo');
		options = [];
		// options.push('<option value="FAC">Facturación</option>');
		// options.push('<option value="REM">Remito</option>');
		
		$.each(Object.keys(dic_tipo_comp), function(i , opcion) {
			$.each(perfil.talonarios, function(i , value) {
				if ( value.tipo_comprobante == opcion ) {
					options.push('<option value="'+ opcion +'">'+ dic_tipo_comp[opcion].titulo +'</option>');
					return false;
				}
			});	
		});
		$select.html(options.join(""));
			
		// botones
		$('#btnCancelar').show();
		$('#btnOpciones').hide();
		$('#btnConsulta').hide();
		$('#btnBuscar').show();
		$('#btnArticulo').hide();
		$('#btnGrabar').hide();

		// iniciar pedido/cotiza/factura/credito
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
			$("#dlg_articulo_msg").hide();
			document.getElementById("ed_cantidad_busqueda").value = '1'; // cantidad x defecto
			document.getElementById("buscar_articulo").focus();
			dlg_articulo.showModal();			
		}
	}	

	document.getElementById('btnAgregar').onclick = function() {
		agregarArticulo(codigo_articulo);
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
	
	document.getElementById('btnCerrar').onclick = function() {
		dlg_articulo.close();		
	}
	
	document.getElementById('btnGrabarCantidad').onclick = function() {		
		var cnt = getNum(document.getElementById('ed_cantidad').value);
		detalle_pedido[sel_detalle].cantidad = cnt;
		calculo();
		dlg_cantidad.close();		
	}
	
	document.getElementById('btnCerrarCantidad').onclick = function() {
		dlg_cantidad.close();		
	}

	// Cantidad
	$('#ed_cantidad').keypress(function(event) {
		if (((event.which != 46 || (event.which == 46 && $(this).val() == '')) ||
				$(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
		}).on('paste', function(event) {
			event.preventDefault();
	});
	
	$('#ed_cantidad_busqueda').keypress(function(event) {
		if (((event.which != 46 || (event.which == 46 && $(this).val() == '')) ||
				$(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
		}).on('paste', function(event) {
			event.preventDefault();
	});
	
	// eventos
	var input = document.getElementById("password");
	input.addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			document.getElementById("btnLogin").click();
		}
	}); 	
	
	// buscar texto en cliente
	var input_1 = document.getElementById("search_client");
	input_1.addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			event.preventDefault();
			buscarClientes();									
		}
	}); 	

	// buscar artículos	
	var input_2 = document.getElementById("buscar_articulo");
	input_2.addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key on the keyboard
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
