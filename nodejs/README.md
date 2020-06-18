# Neartech SDK para NodeJS

Esta biblioteca proporciona a los desarrolladores un conjunto simple de funciones para ayudarlo a integrar la API REST de Neartech en un sitio web 
y comenzar a grabar Pedidos/Comprobantes en Tango.

## Instalación

Copie el archivo [nt_node.js](https://github.com/neartechsrl/pedidos-rest/blob/master/nodejs/nt_node.js) en el directorio de su aplicación NodeJS. Y agregue la referencia de la siguiente forma.

```javascript
var nt = require('./nt_node.js');
```

## Ejemplo de uso

```javascript
// Prueba Modulo Neartech
var nt = require('./nt_node.js');
nt.configure('localhost', 3000, 'MIGUEL', '123456');

// Login
nt.login( 
  function(data) {
	 console.log(data);
 }
);

// Consulta de Pedidos
var q = {
	'codigo_perfil': 1,
	'fecha_desde': '01/01/2020',
	'fecha_hasta': '31/12/2020',
	'tipo_comprobante': 'PED'
}
	
nt.consulta_comprobantes(q, function(data) {
	 console.log(data);
 }
);

// Nuevo Pedido
var pedido = {
     'codigo_perfil': 1,
     'codigo_cliente': '000000',
     'talonario': 6,
     'fecha': '18/06/2020',
     'codigo_vendedor': '1',
     'codigo_condicion': 2,
     'codigo_transporte': '01',
     'codigo_deposito': '1',
     'numero_lista': 1,
     'leyenda_1': 'Prueba desde Node.js',
     'leyenda_2': '',
     'leyenda_3': '',
     'leyenda_4': '',
     'leyenda_5': '',
     'total': '84.70',
     'datos_cliente': {
          'nombre_cliente': 'PEREZ JUAN',
          'domicilio': 'Mitre 1100',
          'localidad': 'San Rafael',
          'codigo_postal': '5600',
          'codigo_provincia': '05',
          'e_mail': '',
          'tipo_documento': 96,
          'cuit': '123456',
          'codigo_categoria_iva': 'CF',
          'telefono': '555-5555'
         },
     'detalle': [
		{
          'codigo_articulo': '001',
          'cantidad': '1.00',
          'precio': '70.00',
          'descuento': '0.00'
	    }
	 ]
}

nt.pedido(pedido, function(data) {
	 console.log(data);
 }
);

```

## ❤️ Soporte

Si usted necesita soporte técnico, por favor contactar con nuestro equipo de soporte por email a <mailto:info@neartech.com.ar>.

## 🏻 Licencia

```
MIT license. Copyright (c) 2020 - Neartech
Para más información, vea el archivo LICENSE.
```

Ayúdenos a hacerlo mejor
------------------------

Por favor, díganos cómo podemos mejorar la API. Para hablar con nosotros sobre la API, no dude en escribirnos a <mailto:info@neartech.com.ar>.

Visite nuestrá página: [Neartech SRL](http://www.neartech.com.ar)

![alt text](http://neartech.com.ar/wp-content/uploads/2018/10/Neartech-Consulting-Group.png "Neartech SRL")



