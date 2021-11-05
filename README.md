# Enunciado
Los ficheros con la estructura de la práctica los tienes en el repositorio ... 

Los datos los tienes en el fichero `datos.js` donde hay 2 variables:
- **products**: con los datos de los productos a mostrar
- **typesOfFuel**: con los tipos de combustible

## Práctica 1
Haz que aparezcan los distintos productos en la página principal.

El código HTML que debes pones para cada producto será:
```html
<div class="col mb-5">
    <div class="card h-100">
        <!-- Sale badge, sólo si está vendido-->
        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
        <!-- Product image-->
        <img class="card-img-top" src="_Imagen_del_producto o https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Imagen de _nombre_del_producto_" />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">_Nombre del producto_</h5>
                <!-- Product reviews, un div bi-star para cada estrella a pintar-->
                <div class="d-flex justify-content-center small text-warning mb-2">
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                    <div class="bi-star-fill"></div>
                </div>
                <!-- Product price-->
                <span class="text-muted text-decoration-line-through">1000.00 €</span>
                800.00 €
                <!-- Product details -->
                <p>
                    _tipo_de_combustible_ - 
                    _tipo_de_cambio_
                    <br>_km_
                </p>
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Mostrar</a></div>
        </div>
    </div>
</div>
```

Puedes añadir _id_ o _class_ a los elementos que necesites para identificarlos desde Javascript.

Al pulsar el botón de '_Mostrar_' se mostrará por consola el producto.

En varios sitios debemos transformar un número en moneda (con los puntos de los millares y el símbolo del €) por lo que es conveniente hacer una función que se encargue de ello.

Recuerda lo que aprendiste en año pasado: una función debe tener sólo una responsabilidad (debe ocuparse de sólo una cosa). Así el código será más claro y fácil de mantener.

## Práctica 2
Haz un formulario para dar de alta un nuevo producto. Al enviarlo simplemente se mostrará por consola (igual que al pulsar en '_Mostrar_'). Los campos que tendrá son:
- **name**: obligatorio, entre 10 y 30 caracteres
- **original_price**: obligatorio y numérico
- **discount_price**: opcional, numérico
- **stars**: opcional, numérico entre 1 y 5
- **photo**: opcional, fichero con extensión .png, .jpg, .jpeg o .webp
- **fuel**: obligatorio, a seleccionar una opción entre los tipos de combustible existentes
- **manual_gear**: booleano que indica si el cambio de marchas es o no manual
- **km**: obligatorio y numérico

No se puede enviar un formulario incorrrecto.

## Práctica 3
Crea un formulario para el _login_ y otro para el _registro_ de los usuarios.