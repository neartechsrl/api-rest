Tango Restô
-----------

## Métodos GET

#### GET /arbol_rubros

Recibe árbol rubros completo

ejemplo: `GET /arbol_rubros?nombre_base=Desarrollo_PlusNT&codigo_perfil=1`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código de perfil __REQUERIDO__ |

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

#### GET /articulos 

Recibe todos los artículos

ejemplo: `GET /articulos?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&numero_lista=1&q=BARRA`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código de perfil __REQUERIDO__ |
| numero_lista	 | Número de Lista de Precio __REQUERIDO__ |
| sort_by		 | Ordenar artículos por un criterio en particular. |
| page 			 | Páginas a consultar ( 100 registros por página ) |
| q				 | Filtro por descripción, adicional, sinónimo etc. |
| binary_img	 | Indica si las imagenes vienen en formato binario o solo la uri. 1=Si, 0=No -> valor x defecto, se envía la uri. |
| size_img		 | Tamaño imagen. 128x128 por defecto |
| code			 | Filtro por código de artículo o código de barra |
| codigo_articulo| Filtro por código de artículo |
| id_folder 	 | Filtro por id_folder de carpeta clasificador (Solo Tango Gestion) |
| codigo_rubro 	 | Filtro por rubro (Solo Tango Restó) |
| codigo_barra 	 | Filtro por código de barra |
| adicional 	 | Filtro por descripción adicional |
| sinonimo    	 | Filtro por sinónimo |

| Criterios de Ordenamiento | Explicación |
| ------------------------  | ----------- |
| code-asc		| Ordenar por código ascendente |
| code-desc		| Ordenar por código descendente |
| alpha-asc		| Ordenar por descripción ascendente |
| alpha-desc 	| Ordenar por descripción descendente |

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
		"equivalencia_stock_2": 0,
		"stock": [
            {
                "codigo_articulo": "001",
                "codigo_deposito": "V1",
                "desc_deposito": "Deposito vendedor V1",
                "stock": 4700,
                "stock_ventas": 1000
            }
        ]		
	},
]
```

#### GET /articulo

Ejemplo: `GET /articulo?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&numero_lista=1&codigo=BARRA01`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	| Código de perfil a consultar __REQUERIDO__| 
| numero_lista	| Número de Lista de Precio __REQUERIDO__| 
| codigo		| Filtro por código de artículo o código de barra. __REQUERIDO__| 
| binary_img	| Indica si las imagenes vienen en formato binario o solo la uri. 1=Si, 0=No -> valor x defecto, se envía la uri.| 
| size_img		| Tamaño imagen. 128x128 por defecto| 

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
	"precio": 70,
	"stock": [
            {
                "codigo_articulo": "001",
                "codigo_deposito": "V1",
                "desc_deposito": "Deposito vendedor V1",
                "stock": 4700,
                "stock_ventas": 1000
            }
    ]	
}
```

#### GET /stock

Información de stock de artículo

Ejemplo: `GET /stock?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&codigo=BARRA01`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	| Código de perfil a consultar codigo_perfil __REQUERIDO__| 
| codigo		| Filtro por código de artículo o código de barra| 

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

#### GET /cuentas_resto

Consulta cuentas de fondos de Restô

ejemplo: `GET /arbol_rubros?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&preference_id=682211875-67944612-cdba-40cb-9971-229861505802`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código de perfil __REQUERIDO__ |

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
[
    {
        "codigo_cuenta": 1,
        "desc_cuenta": "EFECTIVO",
        "tipo_cuenta": "E"
    },
    {
        "codigo_cuenta": 5,
        "desc_cuenta": "TARJETAS",
        "tipo_cuenta": "T"
    },
    {
        "codigo_cuenta": 7,
        "desc_cuenta": "MERCADOPAGO",
        "tipo_cuenta": "O"
    }
]
```

#### GET /consulta_pago_mercado_pago

Consulta pago de Mercado Pago mediante preference_id

ejemplo: `GET /arbol_rubros?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&preference_id=682211875-67944612-cdba-40cb-9971-229861505802`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código de perfil __REQUERIDO__ |
| preference_id	 | Código de preferencia __REQUERIDO__ |

Respuesta Servidor

`HTTP/1.1 200 OK`

```json
{
    "elements": [
        {
            "id": 3923980386,
            "status": "closed",
            "external_reference": "",
            "preference_id": "682211875-67944612-cdba-40cb-9971-229861505802",
            "payments": [
                {
                    "id": 19360376709,
                    "transaction_amount": 350,
                    "total_paid_amount": 350,
                    "shipping_cost": 0,
                    "currency_id": "ARS",
                    "status": "approved",
                    "status_detail": "accredited",
                    "operation_type": "regular_payment",
                    "date_approved": "2022-01-07T17:51:01.000-04:00",
                    "date_created": "2022-01-07T17:51:01.000-04:00",
                    "last_modified": "2022-01-07T17:51:01.000-04:00",
                    "amount_refunded": 0
                }
            ],
            "shipments": [],
            "payouts": [],
            "collector": {
                "id": 682211875,
                "email": "",
                "nickname": "TETE9884291"
            },
            "marketplace": "NONE",
            "notification_url": null,
            "date_created": "2022-01-07T21:51:00.629+00:00",
            "last_updated": "2022-01-25T20:56:04.849+00:00",
            "sponsor_id": null,
            "shipping_cost": 0,
            "total_amount": 350,
            "site_id": "MLA",
            "paid_amount": 350,
            "refunded_amount": 0,
            "payer": {
                "id": 682211922,
                "email": ""
            },
            "items": [
                {
                    "id": "CHA01",
                    "category_id": "",
                    "currency_id": "ARS",
                    "description": "UNI ALFAJOR DE CHOCOLATE",
                    "picture_url": null,
                    "title": "Producto sin descripción",
                    "quantity": 2,
                    "unit_price": 100
                },
                {
                    "id": "HVA00",
                    "category_id": "",
                    "currency_id": "ARS",
                    "description": "HELADO VASO 50 UNA BOCHA",
                    "picture_url": null,
                    "title": "Producto sin descripción",
                    "quantity": 1,
                    "unit_price": 150
                }
            ],
            "cancelled": false,
            "additional_info": "",
            "application_id": null,
            "order_status": "paid"
        }
    ],
    "next_offset": 1,
    "total": 1
}
```

## Métodos POST

#### POST /comanda

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

| Secciones | Explicación | Observación |
| --------- | ----------- | ----------- |
| pagos		| indica uno o mas metodos de pago | Opcional.  |
| envio | Indica como se realiza el envio y si lleva costo adicional | Opcional |

| Metodos de Pago | Explicación |
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

#### POST /preferencia_mercado_pago

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

```json
{
	"codigo_perfil":1,
    "preference": {
        "statement_descriptor": "La Delicia Boulevard",
        "back_urls": {
            "failure": "http://neartech.com.ar/failure",
            "pending": "http://neartech.com.ar/pending",
            "success": "http://neartech.com.ar/success"
        },
        "payer": {
            "name": "Miguel Sandro",
            "surname": "Lucero",
            "email": "mlucero@neartech.com.ar",			
            "phone": {
                "area_code": "",
                "number": ""
            },
            "identification": {
                "type": "DNI",
                "number": "35999111"
            },
            "address": {
                "zip_code": "5600",
                "street_name": "Balloffet",
                "street_number": "140"
            }
        },
        "items":[
            {
                "id":"CHA01",
                "title":"UNI ALFAJOR DE CHOCOLATE",
                "description":"UNI ALFAJOR DE CHOCOLATE",
                "unit_price": 100.00,
                "quantity": 2
            },
            {
                "id":"HVA00",
                "title":"HELADO VASO 50 UNA BOCHA",
                "description":"HELADO VASO 50 UNA BOCHA",
                "unit_price": 150,
                "quantity": 1
            }
        ]
    }
}
```
