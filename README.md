API REST Neartech
=================

Con nuestra API usted podrá integrar cualquier sistema con Axoft Tango o nuestros propios sistemas.

Errores de Cliente
------------------

Estos son los posibles tipos de errores de cliente en las llamadas a la API

* Enviar JSON inválido resultará en una respuesta `400 Bad Request` y alguna de las siguientes dos formas de informar el error.

```
HTTP/1.1 400 Bad Request
Content-Length: 34

{
	"error": "URI inválida o el método /zona no genera ningún registro"
}

```

```
HTTP/1.1 400 Bad Request
Content-Length: 34

{
    "errores": [
        {
            "codigo_error": 3000,
            "desc_error": "Comprobante Invalido",
            "detalle_error": "Perfil/Usuario inválido"
        }
    ],
    "uri": "/recibo"
}

```

* Enviar campos invalidos resultará en una respuesta `422 Unprocessable Entity`.

```
HTTP/1.1 422 Unprocessable Entity
Content-Length: 47
{
  "campo": [
      "error campo"
    ]
}
```

Posibles respuestas servidor

`HTTP/1.1 415 Unsupported media type`
`HTTP/1.1 400 Bad Request`
`HTTP/1.1 200 OK`
`HTTP/1.1 201 Created`

Paginación
----------

Las solicitudes que devuelvan varios elementos se paginarán a 100 elementos de forma predeterminada. 
Puede especificar más páginas con el parámetro `page`.

Tenga en cuenta que la numeración de páginas se basa en 1 y que al omitir el parámetro `page` se obtendrá la primera página.

Para comprobar el recuento total de los resultados puede utilizar el encabezado `Total-Count`:

```
Total-Count: 156
```

Comandos HTTP
-------------

* `GET` : Se utiliza para recuperar recursos.
* `POST` : Se utiliza para crear recursos.

Recursos API
------------

* [General](https://github.com/neartechsrl/pedidos-rest/blob/master/general.md)
* [Ventas](https://github.com/neartechsrl/pedidos-rest/blob/master/ventas.md)
* [Stock](https://github.com/neartechsrl/pedidos-rest/blob/master/stock.md)
* [Compras](https://github.com/neartechsrl/pedidos-rest/blob/master/compras.md)
* [Restô](https://github.com/neartechsrl/pedidos-rest/blob/master/resto.md)

Ayúdenos a hacerlo mejor
------------------------

Por favor, díganos cómo podemos mejorar la API. Para hablar con nosotros sobre la API, no dude en escribirnos a <mailto:info@neartech.com.ar>.

Visite nuestrá página: [Neartech SRL](https://www.neartech.com.ar)
