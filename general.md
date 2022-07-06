General
-------

#### GET /empresas

Respuesta Servidor 

`HTTP/1.1 200 OK`

```json
[
    {
        "nombre_empresa": "Desarrollo 1",
        "nombre_base": "Desarrollo_1"
    },
    {
        "nombre_empresa": "Desarrollo 2",
        "nombre_base": "Desarrollo_2"
    },
    {
        "nombre_empresa": "Desarrollo PlusNT",
        "nombre_base": "Desarrollo_PlusNT"
    }
]
```

#### GET /perfiles

ejemplo: `GET /perfiles?nombre_base=Desarrollo_PlusNT`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

Respuesta Servidor 

`HTTP/1.1 200 OK`

```json
[
    {
        "codigo_perfil": 1,
        "desc_perfil": "PREVENTA"
    }
]
```

#### GET /login

Ejemplo Login

ejemplo: `GET /login?nombre_base=Desarrollo_PlusNT`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |

Respuesta Servidor 

`HTTP/1.1 200 OK`

```json
{
    "nombre_base": "Desarrollo_PlusNT",
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
	],
	"nombre_base": "Desarrollo_PlusNT",
    "longitud_familia": "2",
    "longitud_grupo": "3",
    "longitud_individuo": "10"		
}
```

#### GET /consulta_externa

ejemplo: `GET /consulta_externa?nombre_base=Desarrollo_PlusNT&codigo_perfil=1&nombre_vista=v_SaldoEnvases&Codigo Cliente=999999&Codigo Articulo=101`

| Parámetros     | Explicación|
| -------------- | ---------- |
| nombre_base	 | Nombre base de datos. __REQUERIDO__ |
| codigo_perfil	 | Código perfil. __REQUERIDO__ |
| nombre_vista	 | Nombre vista SQL. __REQUERIDO__ |

Respuesta Servidor 

`HTTP/1.1 200 OK`

```json
[
    {
        "Codigo Articulo": "101",
        "Codigo Cliente": "999999",
        "Descripcion Articulo": "CAJÓN BLANCO 2021",
        "Razon Social": "CONSUMIDOR FINAL",
        "Saldo": 28
    }
]
```
