Módulo Ventas
-------------

## Métodos GET

#### GET /categoria_iva

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

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

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

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

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

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

Ejemplo: `GET /clientes?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&q=LUCERO`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	| Código Perfil __REQUERIDO__| 
| sort_by		| Ordenar clientes por un criterio en particular.| 
| page 			| Páginas a consultar ( 100 registros por página )| 
| q				| Filtro por nombre __REQUERIDO__| 

| Criterios de Ordenamiento| Explicación|
| -------------- | ---------- |
| code-asc		| Ordenar por código ascendente| 
| code-desc		| Ordenar por código descendente| 
| alpha-asc		| Ordenar por descripción ascendente| 
| alpha-desc	| Ordenar por descripción descendente| 

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

Consulta de cliente específico

Ejemplo: `GET /cliente?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&codigo_cliente=000003`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código Perfil __REQUERIDO__| 
| codigo_cliente | Código Cliente __REQUERIDO__| 

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

Ejemplo: `GET /consulta_comprobantes?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&fecha_desde=01/01/2019&fecha_hasta=30/09/2019&tipo_comprobante=PED`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil		| Código Perfil __REQUERIDO__| 
| fecha_desde		| Fecha Desde. Formato dd/mm/yyyy __REQUERIDO__| 
| fecha_hasta		| Fecha Hasta. Formato dd/mm/yyyy __REQUERIDO__| 
| tipo_comprobante	| Tipo Comprobante PED, COT, FAC, CRE, REM. __REQUERIDO__| 
| texto_cliente		| Búsqueda por código o razón social cliente. *** OPCIONAL ***| 

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

Ejemplo: `GET /pdf_comprobante?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&tipo_comprobante=PED&talonario=6&numero_comprobante= 0000000000342`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil			| Código Perfil| 
| tipo_comprobante		| Tipo Comprobante PED, COT, FAC, CRE, REM| 
| talonario				| Número Talonario| 
| numero_comprobante	| Número Comprobante| 

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

Consulta de pedidos pendientes de cliente específico

Ejemplo: `GET /pedidos_pendientes?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&codigo_cliente=000003`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código Perfil __REQUERIDO__| 
| codigo_cliente | Código Cliente __REQUERIDO__| 

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

Consulta de detalle de pedido pendiente

Ejemplo: `GET /detalle_pedido_pendiente?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&talonario=6&numero_comprobante= 0000000000022&numero_lista=1`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código Perfil __REQUERIDO__| 
| talonario | Talonario __REQUERIDO__| 
| numero_comprobante | Número Pedido __REQUERIDO__| 
| numero_lista | Número Lista de Precio __REQUERIDO__| 

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

## Métodos POST

#### POST /pedido ( grabar un pedido ) 
#### POST /cotiza ( grabar cotización ) 
#### POST /comprobante ( grabar comprobante de ventas, FAC, DEB y CRE por el momento, campo numero_comprobante es opcional. ) 
#### POST /remito ( grabar remito )

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

```json
{
	"codigo_perfil": 1,
	"codigo_cliente": "000000",	
	"tipo_comprobante": "FAC",
	"numero_comprobante": "A0006600000032",
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
	"comprobante_referencia": "",
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
			"importe":400.0,
			"datos_tarjeta": [
				{
					"lote": "0000",
					"cupon": 123456,
					"cuotas": 3,
					"importe": 400.0,
					"nombre_cliente": "PEREZ MARIA",
					"tipo_documento": "DNI",
					"numero_documento": "123456",
					"telefono": "",
					"vencimiento": "062021",
					"codigo_autorizacion": "6656565"
				}
			]
		},
		{
			"codigo_cuenta": 3,
			"importe":100.0,
			"datos_cheque": [
                {
                    "numero_cheque": 102030,
                    "codigo_banco": "044",
                    "vencimiento": "01/08/2020",
                    "codigo_postal": "5600",
                    "sucursal_banco": 1,
                    "nombre_cliente": "",
                    "cuit": "",
                    "importe":100.0
                }
             ]
        }
	]
}
```

Respuestas servidor

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

#### POST /recibo ( grabar recibo. Campo numero_comprobante es opcional. ) 

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

```json
{
	"codigo_perfil": 1,
	"codigo_cliente": "000003",	
	"talonario": 500,
	"numero_comprobante": "X0006600000032",
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
			"importe":800.0,
			"datos_tarjeta": [
				{
					"lote": "0000",
					"cupon": 123456,
					"cuotas": 3,
					"importe": 800.0,
					"nombre_cliente": "PEREZ MARIA",
					"tipo_documento": "DNI",
					"numero_documento": "123456",
					"telefono": "",
					"vencimiento": "062021",
					"codigo_autorizacion": "6656565"
				}
			]
		},
		{
			"codigo_cuenta": 3,
			"importe":100.0,
			"datos_cheque": [
                {
                    "numero_cheque": 102030,
                    "codigo_banco": "044",
                    "vencimiento": "01/08/2020",
                    "codigo_postal": "5600",
                    "sucursal_banco": 1,
                    "nombre_cliente": "",
                    "cuit": "",
                    "importe":100.0
                }
            ]
        }
	]
}
```

#### POST /cliente ( grabar nuevo cliente ) 

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

| Campos     | Explicación|
| -------------- | ---------- |
| codigo_perfil | Código de Perfil. __REQUERIDO__ |
| codigo_cliente | Código de cliente. No debe existir en Tango. Si es vacío se crea código automáticamente con formato numérico. ej. 000001 |
| cuit | Documento/CUIT de cliente. No debe existir en Tango |
| codigo_provincia | Código de provincia. Consular el método login |

```json
{
	"codigo_perfil": 1,
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
