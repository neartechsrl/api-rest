Módulo Compras
--------------

## Métodos GET

#### GET /listas_compra

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

Consulta de listas de compras.

Ejemplo: `GET /listas_compra?nombre_base=Desarrollo_PlusNT&codigo_perfil=1`

```json
[
  {
    "numero_lista": 1,
    "desc_lista": "LISTA CONTADO"
  },
  {
    "numero_lista": 2,
    "desc_lista": "LISTA A 30 DIAS"
  }
]
```

#### GET /condiciones_compra

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

Consulta de condiciones de compra.

Ejemplo: `GET /condiciones_compra?nombre_base=Desarrollo_PlusNT&codigo_perfil=1`

```json
[
  {
    "codigo_condicion": 1,
    "desc_condicion": "CONTADO",
    "contado": "S"
  },
  {
    "codigo_condicion": 2,
    "desc_condicion": "50 % CONTADO, 50 % A 30 DIAS",
    "contado": "N"
  },
  {
    "codigo_condicion": 3,
    "desc_condicion": "50 % A 30 DIAS, 50 % A 60 DIAS",
    "contado": "N"
  }
]
```
#### GET /compradores

Consulta de compradores

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

Ejemplo: `GET /compradores?nombre_base=Desarrollo_PlusNT&codigo_perfil=1`

```json
[
  {
    "codigo_comprador": "ALV",
    "nombre_comprador": "ALVAREZ, ERNESTO"
  },
  {
    "codigo_comprador": "ARR",
    "nombre_comprador": "ARROYO, RICARDO"
  },
  {
    "codigo_comprador": "BIE",
    "nombre_comprador": "BIENSEN, CLAUDIA"
  }
]
```

#### GET /talonarios_compra

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

Consulta de talonarios de compra

| Parámetros     | Explicación|
| -------------- | ---------- |
| codigo_perfil	 | Código Perfil __REQUERIDO__| 
| tipo | Tipo Talonario: O = Orden de Compra  __REQUERIDO__ |

Ejemplo: `GET /talonarios_compra?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&tipo=O`

```json
[
  {
    "talonario": 1,
    "desc_talonario": "Ordenes de Compra",
    "tipo": "O"
  }
]
```

#### GET /provincias_compra

Consulta de provincias.

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

Ejemplo: `GET /provincias_compra?nombre_base=Desarrollo_PlusNT&codigo_perfil=1`

```json
[
  {
    "codigo_provincia": "00",
    "desc_provincia": "Capital Federal"
  },
  {
    "codigo_provincia": "01",
    "desc_provincia": "Buenos Aires"
  },
  {
    "codigo_provincia": "02",
    "desc_provincia": "Catamarca"
  },
  {
    "codigo_provincia": "03",
    "desc_provincia": "Córdoba"
  },
  {
    "codigo_provincia": "04",
    "desc_provincia": "Corrientes"
  },
  {
    "codigo_provincia": "05",
    "desc_provincia": "Entre Rios"
  },
  {
    "codigo_provincia": "06",
    "desc_provincia": "Jujuy"
  },
  {
    "codigo_provincia": "07",
    "desc_provincia": "Mendoza"
  },
  {
    "codigo_provincia": "08",
    "desc_provincia": "La Rioja"
  },
  {
    "codigo_provincia": "09",
    "desc_provincia": "Salta"
  },
  {
    "codigo_provincia": "10",
    "desc_provincia": "San Juan"
  },
  {
    "codigo_provincia": "11",
    "desc_provincia": "San Luis"
  },
  {
    "codigo_provincia": "12",
    "desc_provincia": "Santa Fe"
  },
  {
    "codigo_provincia": "13",
    "desc_provincia": "Santiago del Estero"
  },
  {
    "codigo_provincia": "14",
    "desc_provincia": "Tucumán"
  },
  {
    "codigo_provincia": "16",
    "desc_provincia": "Chaco"
  },
  {
    "codigo_provincia": "17",
    "desc_provincia": "Chubut"
  },
  {
    "codigo_provincia": "18",
    "desc_provincia": "Formosa"
  },
  {
    "codigo_provincia": "19",
    "desc_provincia": "Misiones"
  },
  {
    "codigo_provincia": "20",
    "desc_provincia": "Neuquén"
  },
  {
    "codigo_provincia": "21",
    "desc_provincia": "La Pampa"
  },
  {
    "codigo_provincia": "22",
    "desc_provincia": "Rio Negro"
  },
  {
    "codigo_provincia": "23",
    "desc_provincia": "Santa Cruz"
  },
  {
    "codigo_provincia": "24",
    "desc_provincia": "Tierra del Fuego"
  },
  {
    "codigo_provincia": "99",
    "desc_provincia": "Exterior"
  }
]
```

#### GET /proveedores

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código Perfil __REQUERIDO__| 
| codigo_proveedor | Código Proveedor |
| cuit | CUIT Proveedor |
| nombre_proveedor | Nombre Proveedor |
| sort_by		 | Ordenar artículos por un criterio en particular. |
| page 			 | Páginas a consultar ( 100 registros por página ) |

| Criterios de Ordenamiento | Explicación |
| ------------------------  | ----------- |
| code-asc		| Ordenar por código ascendente |
| code-desc		| Ordenar por código descendente |
| alpha-asc		| Ordenar por nombre ascendente |
| alpha-desc 	| Ordenar por nombre descendente |

Ejemplo: `GET /proveedores?nombre_base=Desarrollo_PlusNT&codigo_perfil=1`

```json
[
  {
    "codigo_proveedor": "301100",
    "nombre_proveedor": "ADM. NACIONAL DE ADUANAS",
    "domicilio": "",
    "codigo_postal": "",
    "e_mail": "",
    "localidad": "Capital Federal",
    "codigo_provincia": "00",
    "desc_provincia": "Capital Federal",
    "tipo_documento": 80,
    "cuit": "33-69345023-9",
    "telefono_1": "",
    "telefono_2": ""
  },
  {
    "codigo_proveedor": "999999",
    "nombre_proveedor": "ALFONSO BARASI",
    "domicilio": "",
    "codigo_postal": "",
    "e_mail": "",
    "localidad": "",
    "codigo_provincia": "07",
    "desc_provincia": "Mendoza",
    "tipo_documento": 99,
    "cuit": "",
    "telefono_1": "",
    "telefono_2": ""
  }
]
```

#### GET /proveedor

Consulta proveedor específico

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código Perfil __REQUERIDO__| 
| codigo_proveedor | Código Proveedor __REQUERIDO__| 

Ejemplo: `GET /proveedor?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&codigo_proveedor=999999`

```json
{
  "codigo_proveedor": "999999",
  "nombre_proveedor": "ALFONSO BARASI",
  "domicilio": "",
  "codigo_postal": "",
  "e_mail": "",
  "localidad": "",
  "codigo_provincia": "07",
  "desc_provincia": "Mendoza",
  "tipo_documento": 99,
  "cuit": "",
  "telefono_1": "",
  "telefono_2": ""
}
```

## Métodos POST

#### POST /orden_compra 

Grabar orden de compra

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

```json
{
	"codigo_perfil":1,
	"codigo_proveedor":"000001",
	"talonario":1,
	"fecha":"03/08/2020",
	"codigo_comprador":"ALV",
	"codigo_condicion":1,
	"codigo_transporte":"01",
	"codigo_deposito":"1",
	"numero_lista":0,
	"leyenda_1":"",
	"leyenda_2":"",
	"leyenda_3":"",
	"leyenda_4":"",
	"leyenda_5":"",
	"total":1815.0,
	"detalle":[
		{
			"codigo_articulo":"001",
			"desc_articulo":"PRUEBA DESDE API 30 caract.",
			"desc_adicional": "adicional 20 caract.",
			"observaciones": "observación artículo múltiple línea",
			"titulo_articulo": "titulo opcional 50 caract.",
			"precio":150,
			"cantidad":10,
			"descuento":0
		}
	]
}
```

#### POST /remito_compra 

Grabar remito de compra

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

```json
{
	"codigo_perfil":1,
	"codigo_proveedor":"000001",
	"talonario":2,
    "numero_comprobante": "X0000100000007",
	"fecha":"04/05/2022",
	"observaciones":"",
	"leyenda_1":"",
	"leyenda_2":"",
	"leyenda_3":"",
	"leyenda_4":"",
	"leyenda_5":"",
	"detalle":[
		{
			"codigo_articulo":"001",
			"desc_articulo":"GENERICO",
			"codigo_deposito": "1",
			"cantidad":10,
            "unidad_medida": "UNI",
            "talonario_oc": 1,
            "numero_oc": " 0000100000017",
            "renglon_oc": 1
		}
	]
}
```
