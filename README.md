API REST Neartech
=================

Se trata de una API de estilo REST que utiliza JSON para la serialización y Basic Auth para la autenticación.

Sólo JSON
---------

Todos los datos se envían y reciben como JSON. En nuestro formato usamos __snake\_case__ para describir las claves de atributos. 
Esto significa que hay que enviar `Content-Type: application/json; charset=utf-8`. 
Recibirá un código de respuesta `415 Unsupported Media Type` si omite el encabezado `Content-Type`.

Errores de Cliente
------------------

Estos son los posibles tipos de errores de cliente en las llamadas a la API

* Enviar JSON inválido resultará en una respuesta `400 Bad Request`.

```
HTTP/1.1 400 Bad Request
Content-Length: 34

{"error": "URI invalid"}
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

* [API](https://github.com/neartechsrl/pedidos-rest/blob/master/api.md)

Ayúdenos a hacerlo mejor
------------------------

Por favor, díganos cómo podemos mejorar la API. Para hablar con nosotros sobre la API, no dude en escribirnos a <mailto:info@neartech.com.ar>.

Visite nuestrá página: [Neartech SRL](http://www.neartech.com.ar)

![alt text](http://neartech.com.ar/wp-content/uploads/2018/10/Neartech-Consulting-Group.png "Neartech SRL")



