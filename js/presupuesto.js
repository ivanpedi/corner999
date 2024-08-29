//============== SCRIPTS ESPECIFICOS DE presupuestos.html ===============

// Primero definimos las funciones de validación
function validarNombre(campo) {
    const regex = /^[a-zA-ZÀ-ÿ\s]{2,15}$/;
    return regex.test(campo);
}

function validarApellido(campo) {
    const regex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    return regex.test(campo);
}

function validarTelefono(telefono) {
    const regex = /^[0-9]{9}$/;
    return regex.test(telefono);
}

function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(correo);
}

// Luego, utilizamos las funciones dentro del manejo del evento submit
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const primerApellido = document.getElementById('primerApellido').value.trim();
    const segundoApellido = document.getElementById('segundoApellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    if (!validarNombre(nombre)) {
        alert('Por favor, ingresa un nombre válido (debe tener solo letras y maximo 15 caracteres).');
        return;
    }

    if (!validarApellido(primerApellido)) {
        alert('Por favor, ingresa un primer apellido válido (debe tener solo letras y maximo 40 caracteres).');
        return;
    }

    if (segundoApellido && !validarApellido(segundoApellido)) {
        alert('Por favor, ingresa un segundo apellido válido (debe tener solo letras y maximo 40 caracteres).');
        return;
    }

    if (!validarTelefono(telefono)) {
        alert('Por favor, ingresa un número de teléfono válido (debe tener 9 digitos ).');
        return;
    }

    if (!validarCorreo(correo)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    alert('Formulario enviado con éxito!');
    this.submit();
});

// ===================== SELECT ====================

document.querySelector('.opciones').addEventListener('change', function () {
    document.querySelectorAll('.derived-options').forEach(function (el) {
        el.style.display = 'none';
    });

    var selectedValue = this.value;
    if (selectedValue === 'hombre') {
        document.getElementById('hombre-options').style.display = 'block';
    } else if (selectedValue === 'mujer') {
        document.getElementById('mujer-options').style.display = 'block';
    } else if (selectedValue === 'nino') {
        document.getElementById('nino-options').style.display = 'block';
    }
});

// Escucha el evento de clic del botón de reset
document.getElementById('buttReset').addEventListener('click', function () {
    location.reload();
});

// ===================== CALCULAR PRECIO ======================

// Función para actualizar el precio total
function updateTotalPrice() {
    let precioTotal = 0;

    // Obtener el valor del select principal (hombre, mujer, niño)
    const selectValue = document.querySelector('.opciones').value;

    // Obtener el valor de la sub-opción seleccionada dependiendo de la opción principal
    let subOpcionValue = '';
    if (selectValue === 'hombre') {
        subOpcionValue = document.querySelector('select[name="hombreOpciones"]').value;
    } else if (selectValue === 'mujer') {
        subOpcionValue = document.querySelector('select[name="mujerOpciones"]').value;
    } else if (selectValue === 'nino') {
        subOpcionValue = document.querySelector('select[name="ninoOpciones"]').value;
    }

    // Extraer el precio de la sub-opción seleccionada
    if (subOpcionValue) {
        let precio = parseFloat(subOpcionValue.match(/\d+/)[0]);
        precioTotal += precio;
    }

    // Obtener el valor de los radio buttons y sumar su precio
    const radios = document.querySelectorAll('input[name="opcion"]:checked');
    radios.forEach(function (radio) {
        if (radio.value === 'opcion1') {
            precioTotal += 10; // Precio para "3 días hábiles"
        } else if (radio.value === 'opcion2') {
            precioTotal += 5; // Precio para "10 días hábiles"
        } else if (radio.value === 'opcion3') {
            precioTotal += 2; // Precio para "20 días hábiles"
        }
    });

    // Obtener los valores de los checkboxes y sumar sus precios
    document.querySelectorAll('input[name="extra"]:checked').forEach(checkbox => {
        const labelText = checkbox.parentElement.textContent;
        const priceMatch = labelText.match(/(\d+)€/);
        if (priceMatch) {
            precioTotal += parseInt(priceMatch[1], 10);
        }
    });

    // Mostrar el precio total en el input de texto
    document.getElementById('precio_estimado').value = precioTotal + " €";
}

// Agregar listeners a los checkboxes, radio buttons y selects para calcular el precio automáticamente
document.querySelectorAll('input[name="extra"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateTotalPrice);
});
document.querySelectorAll('input[name="opcion"]').forEach(radio => {
    radio.addEventListener('change', updateTotalPrice);
});
document.querySelectorAll('select[name="hombreOpciones"], select[name="mujerOpciones"], select[name="ninoOpciones"]').forEach(select => {
    select.addEventListener('change', updateTotalPrice);
});

// Actualizar el precio al cargar la página si hay checkboxes o radios seleccionados
document.addEventListener('DOMContentLoaded', updateTotalPrice);

// ABRIR MODAL POLITICA DE PRIVACIDAD DESDE EL HIPERVINCULO DEL CHECKBOX
document.getElementById('enlace_acepta_terminos').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('openModal_politica').click();
});
