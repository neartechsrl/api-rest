Pedidos M�viles Preventa - REST API
-----------------------------------

## M�todos GET

#### GET /login

Ejemplo Login

```shell
curl -X GET \
  http://192.168.1.11:3000/login \
  -H 'Authorization: Basic TUlHVUVMOjEyMzQ1Ng==' \
  -H 'Content-Type: application/json'
```  
		
Respuesta Servidor 

`HTTP/1.1 200 OK`

```json
{
    "codigo_perfil": 1,
    "desc_perfil": "PREVENTA",
    "codigo_vendedor": "1",
    "nombre_vendedor": "WALTER AREVALO",
    "leyenda_1": "",
    "leyenda_2": "",
    "leyenda_3": "",
    "leyenda_4": "",
    "leyenda_5": "",
    "exige_firma": 0,
    "cliente_ocacional": 0,
    "edita_precio": "E",
    "edita_cantidad": "E",
    "edita_descuento": "E",
    "edita_leyenda": "S",
    "edita_fecha": "E",
    "edita_condicion_venta": "E",
    "edita_transporte": "E",
    "edita_lista_precio": "E",
    "edita_talonario": "E",
    "transportes": [
        {
            "codigo_transporte": "02",
            "desc_transporte": "TRANSPORTES LA ESTRELLA"
        }
    ],
    "depositos": [
        {
            "codigo_deposito": "2",
            "desc_deposito": "DEPOSITO GALPON"
        }
    ],
    "talonarios": [
		{
			"tipo_comprobante": "PED",
			"talonario": 6,
			"desc_talonario": "PEDIDOS"
		}
    ],
    "condiciones_venta": [
        {
            "codigo_condicion": 3,
            "desc_condicion": "30/60/90 CON INTERES"
        },
        {
            "codigo_condicion": 4,
            "desc_condicion": "CONTADO 30/60/90"
        }
    ],
    "listas_precio": [
        {
            "numero_lista": 1,
            "desc_lista": "Mayorista"
        }
    ]
}
```

#### GET /articulos 

Recibe todos los art�culos

ejemplo: `GET /articulos?codigo_perfil=1&numero_lista=1&q=BARRA)`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo de perfil a consultar __REQUERIDO__ |
| numero_lista	 | N�mero de Lista de Precio __REQUERIDO__ |
| sort_by		 | Ordenar art�culos por un criterio en particular. |
| page 			 | P�ginas a consultar ( 100 registros por p�gina ) |
| q				 | Filtro por descripci�n, adicional, sin�nimo etc. |
| binary_img	 | Indica si las imagenes vienen en formato binario o solo la uri. 1=Si, 0=No -> valor x defecto, se env�a la uri. |
| size_img		 | Tama�o imagen. 128x128 por defecto |
| code			 | Filtro por c�digo de art�culo o c�digo de barra |

| Criterios de Ordenamiento | Explicaci�n |
| ------------------------  | ----------- |
| code-asc		| Ordenar por c�digo ascendente |
| code-desc		| Ordenar por c�digo descendente |
| alpha-asc		| Ordenar por descripci�n ascendente |
| alpha-desc 	| Ordenar por descripci�n descendente |

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
[
	{
		"codigo_articulo": "001",
		"desc_articulo": "VEHI - GENERICO 001VV",
		"adicional": "10x20x30",
		"sinonimo": "KRN865",
		"codigo_barra": "",
		"unidad_medida_stock": "UNI",
		"unidad_medida_ventas": "UNI",
		"equivalencia": 1,
		"porcentaje_iva": 21,
		"porcentaje_ii": 0,
		"numero_lista": 1,
		"desc_lista": "Mayorista",
		"incluye_iva": 0,
		"incluye_ii": 0,
		"precio": 70
	},
]
```

#### GET /articulo

Ejemplo: `GET /articulo?codigo_perfil=1&numero_lista=1&codigo=BARRA01)`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	| C�digo de perfil a consultar __REQUERIDO__| 
| numero_lista	| N�mero de Lista de Precio __REQUERIDO__| 
| codigo		| Filtro por c�digo de art�culo o c�digo de barra. __REQUERIDO__| 
| binary_img	| Indica si las imagenes vienen en formato binario o solo la uri. 1=Si, 0=No -> valor x defecto, se env�a la uri.| 
| size_img		| Tama�o imagen. 128x128 por defecto| 

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
{
	"codigo_articulo": "001",
	"desc_articulo": "VEHI - GENERICO 001VV",
	"adicional": "10x20x30",
	"sinonimo": "KRN865",
	"codigo_barra": "",
	"unidad_medida_stock": "UNI",
	"unidad_medida_ventas": "UNI",
	"equivalencia": 1,
	"porcentaje_iva": 21,
	"porcentaje_ii": 0,
	"numero_lista": 1,
	"desc_lista": "Mayorista",
	"incluye_iva": 0,
	"incluye_ii": 0,
	"precio": 70
}
```

#### GET /stock

Informaci�n de stock de art�culo

Ejemplo: `GET /stock?codigo_perfil=1&codigo=BARRA01)`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo		| Filtro por c�digo de art�culo o c�digo de barra| 
| codigo_perfil	| C�digo de perfil a consultar codigo_perfil| 

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
{
	"codigo_articulo": "BARRA01",
	"desc_articulo": "BARRA DE HIERRO",
	"equivalencia": 4.7,
	"medida_stock": "KGR",
	"medida_ventas": "BAR",
	"stock": [
		{
			"codigo_deposito": "1",
			"desc_deposito": "DEPOSITO CASA CENTRAL",
			"stock": 9400,
			"stock_ventas": 2000
		},
		{
			"codigo_deposito": "V1",
			"desc_deposito": "Deposito vendedor V1",
			"stock": 4700,
			"stock_ventas": 1000
		}
	]
}
```

#### GET /categoria_iva

`HTTP/1.1 200 OK`

```json
[
    {
		"codigo_categoria_iva": "CF",
		"desc_categoria_iva": "Consumidor final"
    },
    {
		"codigo_categoria_iva": "RI",
		"desc_categoria_iva": "Responsable inscripto"
    }    
]
```

#### GET /provincias

`HTTP/1.1 200 OK`

```json
[
    {
		"codigo_provincia": "01",
		"desc_provincia": "Capital Federal",
		"codigo_pais": "AR"
    },
    {
		"codigo_provincia": "05",
		"desc_provincia": "Mendoza",
		"codigo_pais": "AR"
    }    
]
```

#### GET /zonas

`HTTP/1.1 200 OK`

```json
[
    {
        "codigo_zona": "01",
        "desc_zona": "Zona Norte"
    },
    {
        "codigo_zona": "02",
        "desc_zona": "Zona Centro"
    },
    {
        "codigo_zona": "03",
        "desc_zona": "Zona Sur"
    }
]
```

#### GET /clientes

Consulta de Clientes

Ejemplo: `GET /clientes?codigo_perfil=1&q=LUCERO)`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| sort_by		| Ordenar clientes por un criterio en particular.| 
| page 			| P�ginas a consultar ( 100 registros por p�gina )| 
| codigo_perfil	| C�digo Perfil __REQUERIDO__| 
| q				| Filtro por nombre __REQUERIDO__| 

| Criterios de Ordenamiento| Explicaci�n|
| -------------- | ---------- |
| code-asc		| Ordenar por c�digo ascendente| 
| code-desc		| Ordenar por c�digo descendente| 
| alpha-asc		| Ordenar por descripci�n ascendente| 
| alpha-desc	| Ordenar por descripci�n descendente| 

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
[
	{
		"codigo_cliente": "000003",
		"nombre_cliente": "Lucero Miguel",
		"domicilio": "Montecaseros 1039",
		"e_mail": "mlucero@neartech.com.ar",
		"localidad": "San Rafael",
		"desc_provincia": "MENDOZA",
		"notas": "",
		"telefono_1": "4436103",
		"telefono_2": "102030",
		"tipo_documento": 96,
		"cuit": "20888999",
		"observaciones": "",
		"codigo_zona": "01",
		"desc_zona": "Zona Norte",
		"codigo_pais": "AR",
		"desc_pais": "ARGENTINA"
	}
]
```

#### GET /cliente

Consulta de cliente espec�fico

Ejemplo: `GET /cliente?codigo_perfil=1&codigo_cliente=000003)`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo Perfil __REQUERIDO__| 
| codigo_cliente | C�digo Cliente| 

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
{
	"codigo_cliente": "000003",
	"nombre_cliente": "Lucero Miguel",
	"domicilio": "Montecaseros 1039",
	"e_mail": "mlucero@neartech.com.ar",
	"localidad": "San Rafael",
	"desc_provincia": "MENDOZA",
	"notas": "",
	"telefono_1": "4436103",
	"telefono_2": "102030",
	"tipo_documento": 96,
	"cuit": "20888999",
	"observaciones": "",
	"codigo_zona": "01",
	"desc_zona": "Zona Norte",
	"codigo_pais": "AR",
	"desc_pais": "ARGENTINA"    
}
```

#### GET /consulta_comprobantes

Consulta de comprobantes

Ejemplo: `GET /consulta_comprobantes?codigo_perfil=1&fecha_desde=01/01/2019&fecha_hasta=30/09/2019&tipo_comprobante=PED)`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil		| C�digo Perfil __REQUERIDO__| 
| fecha_desde		| Fecha Desde. Formato dd/mm/yyyy __REQUERIDO__| 
| fecha_hasta		| Fecha Hasta. Formato dd/mm/yyyy __REQUERIDO__| 
| tipo_comprobante	| Tipo Comprobante PED o COT. __REQUERIDO__| 
| texto_cliente		| B�squeda por c�digo o raz�n social cliente. *** OPCIONAL ***| 

Respuesta servidor

`HTTP/1.1 200 OK`

```json
[
	{
		"fecha":"06/09/2019 00:00",
		"tipo_comprobante":"PED",
		"talonario":6,
		"numero_comprobante":" 0000000000342",
		"total":12.1,
		"codigo_cliente":"000001",
		"nombre_cliente":"NEARTECH",
		"domicilio":"Montecaseros 1039",
		"localidad":"San Rafael",
		"cuit":"30-70925957-8",
		"codigo_transporte":"01",
		"desc_transporte":"TRANSPORTE PROPIO",
		"codigo_vendedor":"1",
		"nombre_vendedor":"WALTER AREVALO",
		"codigo_condicion":1,
		"desc_condicion":"CONTADO",
		"codigo_deposito":"1",
		"desc_deposito":"DEPOSITO CASA CENTRAL",
		"numero_lista":1,
		"desc_lista":"Mayorista",
		"incluye_iva":0,
		"incluye_ii":0,
		"leyenda_1":"prueba ",
		"leyenda_2":"ddns",
		"leyenda_3":"",
		"leyenda_4":"",
		"leyenda_5":""
	}
]
```

#### GET /pdf_comprobante

Generar PDF de comprobante 

Ejemplo: `GET /pdf_comprobante?codigo_perfil=1&tipo_comprobante=PED&talonario=6&numero_comprobante= 0000000000342)`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil			| C�digo Perfil| 
| tipo_comprobante		| Tipo Comprobante PED o COT| 
| talonario				| N�mero Talonario| 
| numero_comprobante	| N�mero Comprobante| 

Respuesta servidor

`HTTP/1.1 200 OK`

```json
{
	"tipo_comprobante":"PED",
	"talonario":6,
	"numero_comprobante":" 0000000000342",
	"pdf":"JVBERi0xLjMNCiXi48/TDQoxIDAgb2JqDQ..."
}

```

## M�todos POST

#### POST /pedido ( grabar un pedido ) o POST /cotiza ( grabar cotizaci�n )

```json
{
	"codigo_perfil": 1,
	"codigo_cliente": "000003",	
	"talonario": 6,
	"fecha": "14/06/2019",
	"codigo_vendedor": "1",
	"codigo_condicion": 1,	
	"codigo_transporte": "01",
	"codigo_deposito": "1",
	"numero_lista": 1,
	"leyenda_1": "",
	"leyenda_2": "",
	"leyenda_3": "",
	"leyenda_4": "",
	"leyenda_5": "",
	"total": 568.70,
	"detalle": [
		{
			"codigo_articulo": "001",
			"cantidad": 2,
			"precio": 70,
			"descuento": 0.0
		},
		{
			"codigo_articulo": "002",
			"cantidad": 3,
			"precio": 110,
			"descuento": 0.0
		}
	]
}
```

Ejemplo:

```shell
curl -X POST \
  http://192.168.1.11:3000/pedido \
  -H 'Content-Type: application/json' \
  -d '{
	"codigo_perfil": 1,
	"codigo_cliente": "000003",	
	"talonario": 6,
	"fecha": "14/06/2019",
	"codigo_vendedor": "1",
	"codigo_condicion": 1,	
	"codigo_transporte": "01",
	"codigo_deposito": "1",
	"numero_lista": 1,
	"leyenda_1": "",
	"leyenda_2": "",
	"leyenda_3": "",
	"leyenda_4": "",
	"leyenda_5": "",
	"total": 568.70,
	"detalle": [
		{
			"codigo_articulo": "001",
			"cantidad": 2,
			"precio": 70,
			"descuento": 0.0
		},
		{
			"codigo_articulo": "002",
			"cantidad": 3,
			"precio": 110,
			"descuento": 0.0
		}
	]
}'
```

Posibles respuestas servidor

`HTTP/1.1 415 Unsupported media type`
`HTTP/1.1 400 Bad Request`
`HTTP/1.1 200 OK`
`HTTP/1.1 201 Created`

```json
{
	"codigo_perfil": 1,
	"fecha": "14/06/2019",
	"tipo_comprobante": "PED",
	"talonario": 6,	
	"numero_comprobante":" 000000000017",
	"codigo_cliente":"000003",
	"nombre_cliente": "Lucero Miguel",
	"domicilio": "Montecaseros 1039",
	"localidad": "San Rafael",
	"cuit": "20888999",
	"total": 1270.50,
	"leyenda_1": "",
	"leyenda_2": "",
	"leyenda_3": "",
	"leyenda_4": "",
	"leyenda_5": "",
	"numero_lista": 1, 
	"desc_lista": "Mayorista",
	"incluye_iva": 0,
	"incluye_ii": 0,
	"codigo_vendedor": "1",
	"nombre_vendedor": "WALTER AREVALO",
	"codigo_condicion": 3,	
	"desc_condicion": "30/60/90 CON INTERES",
	"codigo_deposito": "2",	
	"desc_deposito": "DEPOSITO GALPON",
	"codigo_transporte": "01",
	"desc_transporte": "PROPIO",
	"pdf": "JVBERi0xLjMNCiXi48/TDQoxIDAgb2JqDQ...",
	"detalle":[
		{
			"codigo_articulo": "BARRA",
			"desc_articulo": "BARRA HIERRO ACERO 1020",
			"cantidad": 2.0,
			"precio": 35.0,
			"descuento": 0.0,      
			"adicional": "",
			"sinonimo": "",
			"codigo_barra": "",
			"unidad_medida_ventas": "UNI",
			"unidad_medida_stock": "KILOGRAMOS",
			"equivalencia": 15.0,
			"porcentaje_iva": 21.0,
			"porcentaje_ii": 0.0,
			"precio_pan": 635.25,
			"precio_lista": 35.0,
			"incluye_iva": 0,
			"incluye_ii": 0,
		}    
	]
}
```
