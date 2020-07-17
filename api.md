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
		},
		{
		  "tipo_comprobante": "COT",
		  "talonario": 7,
		  "desc_talonario": "COTIZACIONES"
		},
		{
		  "tipo_comprobante": "FAC",
		  "talonario": 500,
		  "desc_talonario": "FACTURA MANUAL A"
		},
		{
		  "tipo_comprobante": "REM",
		  "talonario": 600,
		  "desc_talonario": "REMITO ONLINE"
		}		
		
    ],
    "condiciones_venta": [
        {
            "codigo_condicion": 1,
            "desc_condicion": "CONTADO",
            "contado": "S"
        },
        {
            "codigo_condicion": 3,
            "desc_condicion": "30/60/90 CON INTERES",
            "contado": "N"
        },
        {
            "codigo_condicion": 4,
            "desc_condicion": "CONTADO 30/60/90",
            "contado": "N"
        }
    ],
    "listas_precio": [
        {
            "numero_lista": 1,
            "desc_lista": "Mayorista"
        }
    ],
    "cuentas_fondo": [
		{
		  "codigo_cuenta": 2,
		  "desc_cuenta": "CAJA MOSTRADOR",
		  "tipo_cuenta": "O"
		},
		{
		  "codigo_cuenta": 7,
		  "desc_cuenta": "TARJETA XXX",
		  "tipo_cuenta": "T"
		},
		{
		  "codigo_cuenta": 8,
		  "desc_cuenta": "TARJETA ZZZ",
		  "tipo_cuenta": "T"
		}
    ],
    "categorias_iva": [
		{
			"codigo_categoria_iva": "CF",
			"desc_categoria_iva": "Consumidor final"
		},
		{
			"codigo_categoria_iva": "RI",
			"desc_categoria_iva": "Responsable inscripto"
		}    
	],
	"provincias": [
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
	],
	"zonas": [
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
}
```

#### GET /arbol_clasificador

Recibe �rbol clasificador completo (Tango Gesti�n - NO Rest� )

ejemplo: `GET /arbol_clasificador?codigo_perfil=1`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo de perfil __REQUERIDO__ |

```json
[
  {
    "id_folder": "20",
    "descripcion": "Art�culos con trazabilidad",
    "id_parent": "1",
    "child_count": 0
  },
  {
    "id_folder": "7",
    "descripcion": "Origen",
    "id_parent": "1",
    "child_count": 2
  },
  {
    "id_folder": "9",
    "descripcion": "Extranjero",
    "id_parent": "7",
    "child_count": 0
  },
  {
    "id_folder": "8",
    "descripcion": "Nacional",
    "id_parent": "7",
    "child_count": 2
  }
 ]
```

#### GET /clasificador

Recibe clasificador (Tango Gesti�n - NO Rest� )

ejemplo: `GET /clasificador?codigo_perfil=1&id_parent=7`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo de perfil __REQUERIDO__ |
| id_parent	 | Si se omite se devuelve primer nivel del clasificador |

```json
[
  {
    "id_folder": "9",
    "descripcion": "Extranjero",
    "id_parent": "7",
    "child_count": 0
  },
  {
    "id_folder": "8",
    "descripcion": "Nacional",
    "id_parent": "7",
    "child_count": 2
  }
]
```

#### GET /arbol_rubros

Recibe �rbol rubros completo (Tango Rest�)

ejemplo: `GET /arbol_rubros?codigo_perfil=1`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo de perfil __REQUERIDO__ |

```json
[
  {
    "codigo_rubro": 6,
    "descripcion_rubro": "BEBIDAS CERVEZAS",
    "codigo_rubro_padre": -1,
    "favorito": "S",
    "child_count": 1
  },
  {
    "codigo_rubro": 18,
    "descripcion_rubro": "QUILMES",
    "codigo_rubro_padre": 6,
    "favorito": "N",
    "child_count": 0
  },
  {
    "codigo_rubro": 11,
    "descripcion_rubro": "BEBIDAS FUERTES",
    "codigo_rubro_padre": -1,
    "favorito": "N",
    "child_count": 0
  },
  {
    "codigo_rubro": 12,
    "descripcion_rubro": "BEBIDAS JUGOS BATIDOS MALTEADA",
    "codigo_rubro_padre": -1,
    "favorito": "N",
    "child_count": 0
  },
 ]
```

#### GET /rubros

Recibe rubros (Tango NO Rest� )

ejemplo: `GET /rubros?codigo_perfil=1&codigo_rubro_padre=17`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo de perfil __REQUERIDO__ |
| codigo_rubro_padre | Si se omite se devuelve primer nivel de rubros |

```json
[
  {
    "codigo_rubro": 19,
    "descripcion_rubro": "BIANCHI",
    "codigo_rubro_padre": 17,
    "favorito": "N",
    "child_count": 0
  }
]
```
#### GET /articulos 

Recibe todos los art�culos

ejemplo: `GET /articulos?codigo_perfil=1&numero_lista=1&q=BARRA`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo de perfil __REQUERIDO__ |
| numero_lista	 | N�mero de Lista de Precio __REQUERIDO__ |
| sort_by		 | Ordenar art�culos por un criterio en particular. |
| page 			 | P�ginas a consultar ( 100 registros por p�gina ) |
| q				 | Filtro por descripci�n, adicional, sin�nimo etc. |
| binary_img	 | Indica si las imagenes vienen en formato binario o solo la uri. 1=Si, 0=No -> valor x defecto, se env�a la uri. |
| size_img		 | Tama�o imagen. 128x128 por defecto |
| code			 | Filtro por c�digo de art�culo o c�digo de barra |
| codigo_articulo| Filtro por c�digo de art�culo |
| id_folder 	 | Filtro por id_folder de carpeta clasificador (Solo Tango Gestion) |
| codigo_rubro 	 | Filtro por rubro (Solo Tango Rest�) |
| codigo_barra 	 | Filtro por c�digo de barra |
| adicional 	 | Filtro por descripci�n adicional |
| sinonimo    	 | Filtro por sin�nimo |

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
		"precio": 70,
		"foto": "data:image/jpeg;base64,/9j/4AA.....",
		"dum": 0,
		"unidad_medida_stock_2": "",
		"equivalencia_stock_2": 0
	},
]
```

#### GET /articulo

Ejemplo: `GET /articulo?codigo_perfil=1&numero_lista=1&codigo=BARRA01`

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

Ejemplo: `GET /stock?codigo_perfil=1&codigo=BARRA01`

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

Ejemplo: `GET /clientes?codigo_perfil=1&q=LUCERO`

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
		"codigo_postal": "5600",
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

Ejemplo: `GET /cliente?codigo_perfil=1&codigo_cliente=000003`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo Perfil __REQUERIDO__| 
| codigo_cliente | C�digo Cliente __REQUERIDO__| 

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
{
	"codigo_cliente": "000003",
	"nombre_cliente": "Lucero Miguel",
	"domicilio": "Montecaseros 1039",
	"e_mail": "mlucero@neartech.com.ar",
	"localidad": "San Rafael",
	"codigo_postal": "5600",
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
	"desc_pais": "ARGENTINA",
	"numero_lista": 1,	
    "desc_lista": "Mayorista",
    "codigo_condicion": 3,
    "desc_condicion": "30/60/90 CON INTERES",
    "cupo_credito": 1500.00,
    "saldo_cta_cte": 150.00
}
```

#### GET /consulta_comprobantes

Consulta de comprobantes

Ejemplo: `GET /consulta_comprobantes?codigo_perfil=1&fecha_desde=01/01/2019&fecha_hasta=30/09/2019&tipo_comprobante=PED`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil		| C�digo Perfil __REQUERIDO__| 
| fecha_desde		| Fecha Desde. Formato dd/mm/yyyy __REQUERIDO__| 
| fecha_hasta		| Fecha Hasta. Formato dd/mm/yyyy __REQUERIDO__| 
| tipo_comprobante	| Tipo Comprobante PED, COT, FAC, CRE, REM. __REQUERIDO__| 
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

Ejemplo: `GET /pdf_comprobante?codigo_perfil=1&tipo_comprobante=PED&talonario=6&numero_comprobante= 0000000000342`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil			| C�digo Perfil| 
| tipo_comprobante		| Tipo Comprobante PED, COT, FAC, CRE, REM| 
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

#### GET /pedidos_pendientes

Consulta de pedidos pendientes de cliente espec�fico

Ejemplo: `GET /pedidos_pendientes?codigo_perfil=1&codigo_cliente=000003`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo Perfil __REQUERIDO__| 
| codigo_cliente | C�digo Cliente __REQUERIDO__| 

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
[
  {
    "talonario_pedido": 6,
    "numero_pedido": " 0000000000017",
    "fecha_pedido": "07/10/2019 00:00"
  },
  {
    "talonario_pedido": 6,
    "numero_pedido": " 0000000000022",
    "fecha_pedido": "25/11/2019 00:00"
  }
]
```

#### GET /detalle_pedido_pendiente

Consulta de detallo de pedido pendiente

Ejemplo: `GET /detalle_pedido_pendiente?codigo_perfil=1&talonario=6&numero_comprobante= 0000000000022&numero_lista=1`

| Par�metros     | Explicaci�n|
| -------------- | ---------- |
| codigo_perfil	 | C�digo Perfil __REQUERIDO__| 
| talonario | Talonario __REQUERIDO__| 
| numero_comprobante | N�mero Pedido __REQUERIDO__| 
| numero_lista | N�mero Lista de Precio __REQUERIDO__| 

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
    "precio": 70,
    "dum": 0,
    "unidad_medida_stock_2": "",
    "equivalencia_stock_2": 0,
    "talonario_pedido": 6,
    "numero_pedido": " 0000000000022",
    "cantidad_pendiente": 4,
    "renglon": 1
  },
  {
    "codigo_articulo": "BARRA01",
    "desc_articulo": "BARRA DE HIERRO",
    "adicional": "Perfil IPN 12 X 12",
    "sinonimo": "",
    "codigo_barra": "10203040",
    "unidad_medida_stock": "KGR",
    "unidad_medida_ventas": "BAR",
    "equivalencia": 4.7,
    "porcentaje_iva": 21,
    "porcentaje_ii": 0,
    "numero_lista": 1,
    "desc_lista": "Mayorista",
    "incluye_iva": 0,
    "incluye_ii": 0,
    "precio": 12.9,
    "dum": 0,
    "unidad_medida_stock_2": "",
    "equivalencia_stock_2": 0,
    "talonario_pedido": 6,
    "numero_pedido": " 0000000000022",
    "cantidad_pendiente": 9.4,
    "renglon": 2
  }
]
```

## M�todos POST

#### POST /pedido ( grabar un pedido ) 
#### POST /cotiza ( grabar cotizaci�n ) 
#### POST /comprobante ( grabar comprobante de ventas, FAC y CRE por el momento ) 
#### POST /remito ( grabar remito )

```json
{
	"codigo_perfil": 1,
	"codigo_cliente": "000000",	
	"tipo_comprobante": "FAC",
	"talonario": 500,
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
				"descuento": 0.0,
				"talonario_pedido": 6,
				"numero_pedido": " 0000000000022",
				"renglon": 2			
			},
			{
				"codigo_articulo": "002",
				"cantidad": 3,
				"precio": 110,
				"descuento": 0.0					
			}
		],
	"datos_cliente": 
		{
			"nombre_cliente": "Lucero Miguel",
			"domicilio": "Montecaseros 1039",
			"codigo_postal": "5600",			
			"localidad": "San Rafael",	
			"codigo_provincia": "01",					
			"tipo_documento": 96,
			"cuit": "20888999",
			"codigo_categoria_iva": "RI",
			"e_mail": "mlucero@neartech.com.ar",			
			"telefono": "4436103",
			"codigo_zona": "03"
		},
	"cuentas_fondo": [
		{
			"codigo_cuenta": 1,
			"importe":68.70 
		},
		{
			"codigo_cuenta": 7,
			"importe":500.0,
			"datos_tarjeta": [
				{
					"lote": "0000",
					"cupon": 123456,
					"cuotas": 3,
					"importe": 500.0,
					"nombre_cliente": "PEREZ MARIA",
					"tipo_documento": "DNI",
					"numero_documento": "123456",
					"telefono": "",
					"vencimiento": "062021",
					"codigo_autorizacion": "6656565"
				}
			]
		}
	]
}
```

Ejemplo Pedido:

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

#### POST /comanda ( grabar comanda en sistema Tango Resto )

| Secciones | Explicaci�n | Observaci�n |
| --------- | ----------- | ----------- |
| pagos		| indica uno o mas metodos de pago | Opcional.  |
| envio | Indica como se realiza el envio y si lleva costo adicional | Opcional |

| Metodos de Pago | Explicaci�n |
| --------------- | ----------- |
| EFECTIVO | Pago en efectivo |
| TARJETA | Pago con tarjeta. Completar datos de tarjeta. |
| MPA | Mercado Pago Argentina |
| PPA | PayPal Argentina |

```json
{
	"codigo_perfil":1,
	"fecha":"29/04/2020",
	"leyenda_1":"",
	"leyenda_2":"",
	"leyenda_3":"",
	"leyenda_4":"",
	"leyenda_5":"",
	"notas": "",
	"total": 970.0,
	"id_pedido_origen": 1,
	"detalle":[
		{
			"codigo_articulo":"CHP01",
			"desc_articulo":"HUEVO PASCUA 110G",
			"precio": 220.0,
			"cantidad": 2,
			"descuento":0
		},
				{
			"codigo_articulo":"DEM05",
			"desc_articulo":"DOCE EMPANADA CAPRESE",
			"precio": 530.0,
			"cantidad": 1,
			"descuento":0
		}
	],
	"pagos": [
		{
			"id": "1234",
			"metodo": "EFECTIVO",
			"total": 970.0,
			"fecha": "",
			"codigo_autorizacion": "",
			"numero_transaccion": "",
			"cuotas": 0,
			"importe_cuota": 0.0,
			"codigo_tarjeta": "",
			"numero_cupon": ""	
		}
	],
	"datos_cliente": 
		{
			"nombre": "Miguel Sandro",
			"apellido": "Lucero",
			"calle": "Balloffet",
			"numero": "140",
			"piso": "1",
			"departamento": "4",
			"codigo_postal": "5600",			
			"localidad": "San Rafael",	
			"codigo_provincia": "04",					
			"tipo_documento": 96,
			"cuit": "20888999",
			"codigo_categoria_iva": "CF",
			"e_mail": "mlucero@neartech.com.ar",			
			"telefono_1": "4436103",
			"telefono_2": ""
		},
	"envio":
		{
			"costo": 100.0,
			"calle": "",
			"numero": "",
			"piso": "",
			"departamento": "",
			"localidad": "",
			"codigo_postal": "",
			"codigo_provincia": "",
			"telefono_1": "",
			"telefono_2": "",
			"entrega_lunes": "S",
			"entrega_martes": "S",
			"entrega_miercoles": "S",
			"entrega_jueves": "S",
			"entrega_viernes": "S",
			"entrega_sabado": "N",
			"entrega_domingo": "N",
			"entrega_hora": "13:00"
		}
}
```

#### POST /recibo ( grabar recibo ) 

```json
{
	"codigo_perfil": 1,
	"codigo_cliente": "000003",	
	"talonario": 500,
	"fecha": "14/06/2019",
	"codigo_vendedor": "1",
	"leyenda": "",
	"concepto": "",
	"total": 1000.00,
	"comprobantes": [
			{
				"tipo_comprobante": "FAC",
				"numero_comprobante":"B000010000017",
				"vencimiento": "10/08/2020",
				"importe": 1000.00	
			}
		],
	"cuentas_fondo": [
		{
			"codigo_cuenta": 1,
			"importe":100.00 
		},
		{
			"codigo_cuenta": 7,
			"importe":900.0,
			"datos_tarjeta": [
				{
					"lote": "0000",
					"cupon": 123456,
					"cuotas": 3,
					"importe": 900.0,
					"nombre_cliente": "PEREZ MARIA",
					"tipo_documento": "DNI",
					"numero_documento": "123456",
					"telefono": "",
					"vencimiento": "062021",
					"codigo_autorizacion": "6656565"
				}
			]
		}
	]
}
```

#### POST /cliente ( grabar nuevo cliente ) 

| Campos     | Explicaci�n|
| -------------- | ---------- |
| codigo_cliente | C�digo de cliente. No debe existir en Tango |
| cuit | Documento/CUIT de cliente. No debe existir en Tango |
| codigo_provincia | C�digo de provincia. Consular el m�todo login |

```json
{
	"codigo_cliente": "000006",
	"nombre_cliente": "PEREZ JUAN",
	"domicilio": "Mitre 12345",
	"localidad": "SAN RAFAEL",
	"codigo_postal": "5600",
	"codigo_provincia": "05",
	"e_mail": "",
	"tipo_documento": 96,
	"cuit": "21888999",
	"codigo_categoria_iva": "CF",
	"telefono": ""
}
```
