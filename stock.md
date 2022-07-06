Módulo Stock
------------

## Métodos GET

#### GET /agrupaciones_articulos

Recibe Agrupación de Artículos. (Tango Gestión - NO Restó )

ejemplo: `GET /agrupaciones_articulos?nombre_base=Desarrollo_PlusNT`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

```json
[
    {
        "codigo_agrupacion": "01",
        "desc_agrupacion": "ELECTRODOMESTICOS"
    },
    {
        "codigo_agrupacion": "01001",
        "desc_agrupacion": "REPUESTOS Y ACCESORIOS"
    }
]
```

#### GET /arbol_clasificador

Recibe árbol clasificador completo (Tango Gestión - NO Restó )

ejemplo: `GET /arbol_clasificador?nombre_base=Desarrollo_PlusNT&codigo_perfil=1`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código de perfil __REQUERIDO__ |

```json
[
  {
    "id_folder": "20",
    "descripcion": "Artículos con trazabilidad",
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

Recibe clasificador (Tango Gestión - NO Restó )

ejemplo: `GET /clasificador?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&id_parent=7`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código de perfil __REQUERIDO__ |
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

Recibe árbol rubros completo (Tango Restó)

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

#### GET /rubros

Recibe rubros (Tango NO Restó )

ejemplo: `GET /rubros?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&codigo_rubro_padre=17`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código de perfil __REQUERIDO__ |
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

## Métodos POST

#### POST /movimiento_stock

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

```json
{
	"codigo_perfil":1,
	"tipo_comprobante":"SAL",
    "numero_comprobante": "",
	"fecha":"18/04/2022",
	"leyenda_1":"",
	"leyenda_2":"",
	"leyenda_3":"",
	"leyenda_4":"",
	"leyenda_5":"",
    "observaciones": "",
    "id_impresora_ip": 0,
	"detalle":[
        {
			"codigo_articulo":"001",
			"desc_articulo":"VEHI - GENERICO 001VV",
			"precio": 0.0,
			"cantidad":10,
            "cantidad_2":0,
            "codigo_deposito":"1",
            "codigo_deposito_origen":"",
            "tipo_movimiento": "S",
            "partida": [
                {
                    "cantidad":10,
                    "cantidad_2":0,
                    "numero_partida": "2022",
                    "despacho": "",
                    "pais": "",
                    "aduana": "",
                    "fecha_vencimiento": "18/04/2023",
                    "comentario": ""
                }
            ]
		}        
	]
}
```

#### POST /articulo

Grabar artículo individual

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código Pefil. __REQUERIDO__ |

```json
{
    "codigo_articulo":"GO002",
    "desc_articulo":"ARTICULO GO002",
    "desc_adicional":"GO001",
    "sinonimo":"",
    "codigo_barra":"",
    "usa_partida":0,
    "usa_escala":"N",
    "escala_1":"",
    "escala_2":"",
    "tipo_articulo":"A",
    "perfil":"A",
    "observaciones": "Artículo cargado desde postman a GO",
    "unidad_medida": {
        "unidad_stock":"UNI",
        "lleva_dum":0,
        "unidad_stock_2":"",
        "equivalencia_stock_2":0.0,
        "unidad_ventas":"UNI",
        "equivalencia_ventas":1.0,
        "unidad_compras":"UNI",
        "equivalencia_compras":1.0
    },
    "stock": {
        "lleva_stock": 1,        
        "stock_minimo":0.0,
        "stock_maximo":0.0,
        "punto_pedido":0.0,
        "descarga_negativo_stock":0,
        "descarga_negativo_ventas":0
    },
    "ventas": {
        "porcentaje_utilidad":0.0,
        "porcentaje_comision":0.0,
        "porcentaje_bonificacion":0.0
    },
    "precios": [
        {
            "numero_lista":1,
            "precio":10000.0
        }
    ],
    "impuestos_ventas": {
        "codigo_iva":1,
        "codigo_percepcion_iva":11,
        "codigo_ii":21,
        "importe_ii":0.0,
        "codigo_percepcion_ii":41
    },
    "impuestos_compras": {
        "codigo_iva":2,
        "codigo_percepcion_iva":0,
        "codigo_ii":40,
        "importe_ii":0.0,
        "codigo_percepcion_ii":0
    }
}
```

#### POST /articulos

Grabar array de artículos nuevos.

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código Pefil. __REQUERIDO__ |

| Controles       | Explicación|
| ----------------| ---------- |
| codigo_articulo | Tamaño máximo 15 caracteres. Si existe no se graba |
| sinonimo	 	  | Tamaño máximo 15 caracteres. Si existe no se graba |
| codigo_barra	  | Tamaño máximo 40 caracteres. Si existe no se graba |

```json
[
	{
		"codigo_articulo":"GO002",
		"desc_articulo":"ARTICULO GO002",
		"desc_adicional":"GO001",
		"sinonimo":"",
		"codigo_barra":"",
		"usa_partida":0,
		"usa_escala":"N",
		"escala_1":"",
		"escala_2":"",
		"tipo_articulo":"A",
		"perfil":"A",
		"observaciones": "Artículo cargado desde postman a GO",
		"unidad_medida": {
			"unidad_stock":"UNI",
			"lleva_dum":0,
			"unidad_stock_2":"",
			"equivalencia_stock_2":0.0,
			"unidad_ventas":"UNI",
			"equivalencia_ventas":1.0,
			"unidad_compras":"UNI",
			"equivalencia_compras":1.0
		},
		"stock": {
			"lleva_stock": 1,        
			"stock_minimo":0.0,
			"stock_maximo":0.0,
			"punto_pedido":0.0,
			"descarga_negativo_stock":0,
			"descarga_negativo_ventas":0
		},
		"ventas": {
			"porcentaje_utilidad":0.0,
			"porcentaje_comision":0.0,
			"porcentaje_bonificacion":0.0
		},
		"precios": [
			{
				"numero_lista":1,
				"precio":10000.0
			}
		],
		"impuestos_ventas": {
			"codigo_iva":1,
			"codigo_percepcion_iva":11,
			"codigo_ii":21,
			"importe_ii":0.0,
			"codigo_percepcion_ii":41
		},
		"impuestos_compras": {
			"codigo_iva":2,
			"codigo_percepcion_iva":0,
			"codigo_ii":40,
			"importe_ii":0.0,
			"codigo_percepcion_ii":0
		}
	},
	{
		"codigo_articulo":"GO003",
		"desc_articulo":"ARTICULO GO003",
		"desc_adicional":"GO003",
		"sinonimo":"",
		"codigo_barra":"",
		"usa_partida":0,
		"usa_escala":"N",
		"escala_1":"",
		"escala_2":"",
		"tipo_articulo":"A",
		"perfil":"A",
		"observaciones": "",
		"unidad_medida": {
			"unidad_stock":"UNI",
			"lleva_dum":0,
			"unidad_stock_2":"",
			"equivalencia_stock_2":0.0,
			"unidad_ventas":"UNI",
			"equivalencia_ventas":1.0,
			"unidad_compras":"UNI",
			"equivalencia_compras":1.0
		},
		"stock": {
			"lleva_stock": 1,        
			"stock_minimo":0.0,
			"stock_maximo":0.0,
			"punto_pedido":0.0,
			"descarga_negativo_stock":0,
			"descarga_negativo_ventas":0
		},
		"ventas": {
			"porcentaje_utilidad":0.0,
			"porcentaje_comision":0.0,
			"porcentaje_bonificacion":0.0
		},
		"precios": [
			{
				"numero_lista":1,
				"precio":10000.0
			}
		],
		"impuestos_ventas": {
			"codigo_iva":1,
			"codigo_percepcion_iva":11,
			"codigo_ii":21,
			"importe_ii":0.0,
			"codigo_percepcion_ii":41
		},
		"impuestos_compras": {
			"codigo_iva":2,
			"codigo_percepcion_iva":0,
			"codigo_ii":40,
			"importe_ii":0.0,
			"codigo_percepcion_ii":0
		}
	}
]
```
