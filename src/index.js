'use strict'
const SERVER = 'http://localhost:3000'
let products = []
let typesOfFuel = []




window.onload = function () {
    getFuel()
    getProducts()
    _setListeners()
    document.getElementById('nuevoCoche').onclick = function () {
        document.getElementById('productsSection').setAttribute("style", "display: none")
        document.getElementById('formulario').setAttribute("style", "display: contents")
    }
    document.getElementById('verCoches').onclick = function () {
        document.getElementById('productsSection').setAttribute("style", "display: contents")
        document.getElementById('formulario').setAttribute("style", "display: none")
    }

}



function _setListeners() {
    const newCarForm = document.getElementById('formulario')
        
    
    newCarForm.addEventListener('submit', (event) => {
        event.preventDefault()

        if (newCarForm.checkValidity()) {
            const newCar = {
                name: document.getElementById("name").value,
                km: document.getElementById("km").value,
                original_price: document.getElementById("original_price").value,
                discount_price: document.getElementById("discount_price").value,
                stars: document.getElementById("stars").value,
                sale: false,
                fuel: document.getElementById("fuel").value,
                manual_gear: document.getElementById("myradio_si").value,
                img: document.getElementById("photo").value,
            }
            createCar(newCar)
            
        }
        const nameInput = document.getElementById('name')
        const originalInput = document.getElementById('original_price')
        const discountInput = document.getElementById('discount_price')
        const starsInput = document.getElementById('stars')
        const photoInput = document.getElementById('photo')
        const radioInput = document.getElementById('myradio_si')
        const kmInput = document.getElementById('km')
        const checkInput = document.getElementById('check')            
        
        if (!nameInput.checkValidity()) {

            if (nameInput.validity.valueMissing) {
                nameInput.setCustomValidity('Este campo es obligatorio');
                renderError(nameInput)
            } else if (nameInput.validity.tooShort) {
                nameInput.setCustomValidity('Este campo debe tener mas de 10 caracteres, has introducido '+nameInput.value.length);
                renderError(nameInput)
            } else if (nameInput.validity.tooLong) {
                nameInput.setCustomValidity('Este campo debe tener menos de 30 caracteres, has introducido '+nameInput.value.length);
                renderError(nameInput)
            }
        }
        
        if (!originalInput.checkValidity()) {
            if (originalInput.validity.valueMissing) {
                originalInput.setCustomValidity('Este campo es obligatorio');
            } else if (originalInput.validity.rangeUnderflow) {
                originalInput.setCustomValidity('Este campo debe ser al menos 0, has introducido '+originalInput.value);
            } else if (originalInput.validity.stepMismatch) {
                originalInput.setCustomValidity('Este campo debe tener 2 decimales como maximo, has introducido '+originalInput.value)
            }
            renderError(originalInput)
        }
        if (!discountInput.checkValidity()) {
            if (discountInput.validity.rangeUnderflow) {
                discountInput.setCustomValidity('Este campo debe ser al menos 0, has introducido '+discountInput.value);
            } else if (discountInput.validity.stepMismatch) {
                discountInput.setCustomValidity('Este campo debe tener 2 decimales como maximo, has introducido '+discountInput.value);
            }
            renderError(discountInput)
        }
        if (!starsInput.checkValidity()) {
            if (starsInput.validity.rangeUnderflow) {
                starsInput.setCustomValidity('Este campo debe ser al menos 0, has introducido '+starsInput.value);
            } else if (starsInput.validity.rangeOverflow) {
                starsInput.setCustomValidity('Este campo debe ser 5 como maximo has introducido '+discountInput.value);
            }
            renderError(starsInput)
        }
        if (!photoInput.checkValidity()) {
            if (photoInput.validity.typeMismatch) {
                photoInput.setCustomValidity('Debes introducir un fichero');
            } else if (photoInput.validity.valid) {
                photoInput.setCustomValidity('Debes introducir archivos .jpg, .png, .jpeg, o .webp');
            }
            renderError(photoInput)
        }
        if (!radioInput.checkValidity()) {
            if (radioInput.validity.valueMissing) {
                radioInput.setCustomValidity('Este campo es obligatorio');
            }
            renderError(radioInput)
        }
        if (!kmInput.checkValidity()) {
            if (kmInput.validity.valueMissing) {
                kmInput.setCustomValidity('Este campo es obligatorio');
            }
            renderError(kmInput)
        }
        if (!checkInput.checkValidity()) {
            if (checkInput.validity.valueMissing) {
                checkInput.setCustomValidity('Este campo es obligatorio');
            }
            renderError(checkInput)
        }
    })
    
}

function renderError(input) {
    if (input.nextElementSibling) {
        let span = input.nextElementSibling
        span.parentElement.removeChild(span)
    }
    let errorSpan = document.createElement('span');
    errorSpan.className = 'error'
    errorSpan.innerHTML = input.validationMessage
    input.parentElement.appendChild(errorSpan)
}

function precioOriginal(precioDescuento, precioOriginal) {
    if (precioDescuento) {
        return precioOriginal + "€"
    } else {
        return ""
    }
}

function precioDescuento(precioDescuento, precioOriginal) {

    if (precioDescuento) {
        return precioDescuento
    } else {
        return precioOriginal
    }
}

function vendido(vendido) {
    if (vendido) {
        return "Vendido"
    } else {
        return ""
    }
}

function showStars(stars) {
    let starsHTML = ''
    for (let i = 0; i < stars; i++) {
        starsHTML += '<div class = "bi-star-fill"></div>'
    }
    return starsHTML
}

function tipoCombustible(typeId) {

    const fuelItem = typesOfFuel.find((item) => item.id === typeId)
    return fuelItem ? fuelItem.fuel : 'Desconocido'
}


function getProducts() {
    const peticion = new XMLHttpRequest();
    peticion.open('GET', SERVER + '/products');
    peticion.send();
    peticion.addEventListener('load', function () {
        if (peticion.status === 200) {
            const datos = JSON.parse(peticion.responseText);
            products = datos
            datos.forEach((product) => renderProduct(product))

        } else {
            console.error('Error en ajax')
        }
    })
}

function getFuel() {
    const peticion = new XMLHttpRequest();
    peticion.open('GET', SERVER + '/typesOfFuel');
    peticion.send();
    peticion.addEventListener('load', function () {
        if (peticion.status === 200) {
            const datos = JSON.parse(peticion.responseText);
            typesOfFuel = datos
            typesOfFuel.forEach(type => {
                let fuelType = document.createElement('option')
                fuelType.innerHTML = '<option value="' + type.id + '">' + type.fuel + '</option>'
                document.getElementById("fuel").appendChild(fuelType)
            });
        } else {
            console.error('Error en ajax')
        }
    })
}

function renderProduct(product) {
    let newProd = document.createElement('div')
    newProd.className = "col mb-5"

    newProd.innerHTML +=
        `<div class="card h-100">
    <!-- Sale badge, sólo si está vendido-->
    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${vendido(product.sale)}</div>
    <!-- Product image-->
    <img class="card-img-top" src="./media/photos/${product.img}" alt="Imagen de producto" />
    <!-- Product details-->
    <div class="card-body p-4">
        <div class="text-center">
            <!-- Product name-->
            <h5 class="fw-bolder">"${product.name}"</h5>
            <!-- Product reviews, un div bi-star para cada estrella a pintar-->
            <div id="estrellas" class="d-flex justify-content-center small text-warning mb-2">
                ${showStars(product.stars)}</div>
            <!-- Product price-->
            <span class="text-muted text-decoration-line-through">${precioOriginal(product.discount_price, product.original_price)}</span>
            ${precioDescuento(product.discount_price, product.original_price)}€
            <!-- Product details -->
            <p>
                 ${tipoCombustible(product.fuel)}-
                 ${product.manual_gear ? 'Manual' : 'Automático'}
                <br>${product.km} km
            </p>
        </div>
    </div>
    <!-- Product actions-->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Mostrar</a></div>
    </div>
    </div>`

    document.getElementById('products').appendChild(newProd)

}

function createCar(newCar) {
    const peticion = new XMLHttpRequest();
    peticion.open('POST', SERVER + '/products');
    peticion.setRequestHeader('Content-type', 'application/json');
    peticion.send(JSON.stringify(newCar));              
    peticion.addEventListener('load', function () {
        renderProduct(newCar)
    })


}