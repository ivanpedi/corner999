// Pagina INDEX o INICIO . Noticias desde archivo externo 

const API_KEY = '8f066a0f1673d3958ac7cbd430012db4';  
const url = `https://gnews.io/api/v4/search?q=moda+deportiva&lang=es&token=${API_KEY}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos:", data);
        if (data.articles) {
            showNews(data.articles);
        } else {
            console.error('No se encontraron noticias.');
        }
    })
    .catch(error => console.error('Error al cargar las noticias:', error));

function showNews(newsData) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    // Limitamos a 4 noticias
    const limitedNews = newsData.slice(0, 4);  

    if (Array.isArray(limitedNews) && limitedNews.length > 0) {
        limitedNews.forEach(news => {
            const newsElement = document.createElement('div');
            newsElement.className = 'news-card'; 
            newsElement.innerHTML = `
                <img src="${news.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${news.title}">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.description || 'No hay descripción disponible.'}</p>
                    <a href="${news.url || '#'}" class="btn btn-primary">Leer más</a>
                </div>
            `;
            newsContainer.appendChild(newsElement);
        });
    } else {
        newsContainer.innerHTML = '<p>No se encontraron noticias.</p>';
    }
}

// FOOTER . Funciones de JS para abrir desde google maps y poder generar rutas.

// Función para abrir el mapa de la tienda en Cadiz
document.getElementById('openMapCadiz').addEventListener('click', function(event) {
    event.preventDefault(); 

    var lat = 36.5246058328783;
    var lng = -6.287045745169399;
    var mapaUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es`;

    window.open(mapaUrl, 'mapaWindow', 'width=800,height=600');
});

// Función para abrir el mapa de la tienda en Jerez
document.getElementById('openMapJerez').addEventListener('click', function(event) {
    event.preventDefault(); 

    var lat = 36.68628953667412;
    var lng = -6.126082766940414;
    var mapaUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es`;

    window.open(mapaUrl, 'mapaWindow', 'width=800,height=600');
});

// Función para abrir el mapa de la tienda en San Fernando
document.getElementById('openMapSanFdo').addEventListener('click', function(event) {
    event.preventDefault(); 

    var lat = 36.46795102831662;
    var lng = -6.194233233915417;
    var mapaUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es`;

    window.open(mapaUrl, 'mapaWindow', 'width=800,height=600');
});

// MODAL del FOOTER. Funciones para aviso y politica 

document.addEventListener("DOMContentLoaded", function () {
    // Obtener los elementos de los modales y los botones
    var modalAviso = document.getElementById("modal");
    var modalPolitica = document.getElementById("modal_politica");

    var openModalAvisoBtn = document.getElementById("openModal");
    var closeModalAvisoBtn = document.getElementById("closeModal");
    var closeSpanAviso = modalAviso.querySelector(".close");

    var openModalPoliticaBtn = document.getElementById("openModal_politica");
    var closeModalPoliticaBtn = document.getElementById("closeModal_politica");
    var closeSpanPolitica = modalPolitica.querySelector(".close");

    // Funciones para abrir los modales
    openModalAvisoBtn.addEventListener("click", function (event) {
        event.preventDefault(); 
        modalAviso.style.display = "block";
    });

    openModalPoliticaBtn.addEventListener("click", function (event) {
        event.preventDefault(); // 
        modalPolitica.style.display = "block";
    });

    // Funciones para cerrar los modales con los botones 'Cerrar'
    closeModalAvisoBtn.addEventListener("click", function () {
        modalAviso.style.display = "none";
    });

    closeModalPoliticaBtn.addEventListener("click", function () {
        modalPolitica.style.display = "none";
    });

    // Funciones para cerrar los modales con el botón 'x'
    closeSpanAviso.addEventListener("click", function () {
        modalAviso.style.display = "none";
    });

    closeSpanPolitica.addEventListener("click", function () {
        modalPolitica.style.display = "none";
    });

    // Cerrar el modal si se hace clic fuera del contenido del modal
    window.addEventListener("click", function (event) {
        if (event.target == modalAviso) {
            modalAviso.style.display = "none";
        }
        if (event.target == modalPolitica) {
            modalPolitica.style.display = "none";
        }
    });
});

// GALERIA . Funciones para los botones, tarjetas  y modales de esta.

const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .card");

// Funcion para las tarjetas segun el boton clickado
const filterCards = (e) => {
    document.querySelector("#filter-buttons .active").classList.remove("active");
    e.target.classList.add("active");

    filterableCards.forEach(card => {
        // Muestra las tarjetas o las oculta segun el boton clickado
        if(card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
            return card.classList.replace("hide", "show");
        }
        card.classList.add("hide");
    });
}

filterButtons.forEach(button => button.addEventListener("click", filterCards));


// MODAL DE LA GALERIA

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal .close');

    document.querySelectorAll('.card img').forEach(img => {
        img.addEventListener('click', function() {
            if (window.innerWidth > 768) { 
                modal.style.display = 'flex';
                modalImage.src = this.src;
            }
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal si se hace clic fuera del contenido del modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

//Barra de navegacion secundaria de la galeria.

// FUNCION PARA QUE APAREZCA LA NAV BAR -2 AL HACER SCROLL
window.addEventListener('scroll', function() {
    const filterButtons = document.getElementById('filter-buttons');
    const mainNavbar = document.querySelector('header');
    const secondaryNav = document.getElementById('secondary-nav'); 

    if (!secondaryNav) {
        console.error('No se encontró el elemento con id="secondary-nav".');
        return;
    }

    const offset = mainNavbar.offsetHeight;

    // Verifica la posición de los botones de filtro
    if (filterButtons.getBoundingClientRect().top <= offset) {
        secondaryNav.classList.add('sticky');
        secondaryNav.style.top = `${offset}px`; 
    } else {
        secondaryNav.classList.remove('sticky');
    }
});

// Selección de class active a través de la secondary-nav
const secondaryNavLinks = document.querySelectorAll('.secondary-nav a');

secondaryNavLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Eliminar la clase active de todos los enlaces
        secondaryNavLinks.forEach(link => link.classList.remove('active'));

        // Añadir la clase active al enlace clicado
        this.classList.add('active');

        
    });
});


// FUNCION PARA ENLAZAR LOS BTONES DE LA GALERIA CON LA NAV-BAR -2

document.addEventListener('DOMContentLoaded', function () {
    // Configuración de la secondary-nav
    const filterButtons = document.getElementById('filter-buttons');
    const mainNavbar = document.querySelector('header');
    const secondaryNav = document.getElementById('secondary-nav');

    if (!secondaryNav) {
        console.error('No se encontró el elemento con id="secondary-nav".');
        return;
    }

    const offset = mainNavbar.offsetHeight;

    // Función para sincronizar los botones activos
    function synchronizeActiveButtons(filterValue) {
        const filterButtonsArray = document.querySelectorAll('#filter-buttons .btn_gal');
        const secondaryNavLinks = document.querySelectorAll('.secondary-nav a');

        // Actualizar botones de la galería
        filterButtonsArray.forEach(button => {
            if (button.getAttribute('data-filter') === filterValue) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Actualizar enlaces de la barra secundaria
        secondaryNavLinks.forEach(link => {
            if (link.getAttribute('data-filter') === filterValue) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Evento de scroll para la barra de navegación secundaria
    window.addEventListener('scroll', function() {
        if (filterButtons.getBoundingClientRect().top <= offset) {
            secondaryNav.classList.add('sticky');
            secondaryNav.style.top = `${offset}px`; // Ajusta la posición según la barra de navegación principal
        } else {
            secondaryNav.classList.remove('sticky');
        }
    });

    // Evento click para los enlaces de la barra secundaria
    document.querySelectorAll('.secondary-nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const filterValue = link.getAttribute('data-filter');

            // Actualizar botones y enlaces activos
            synchronizeActiveButtons(filterValue);

            // Simular clic en el botón de la galería correspondiente
            const buttonToClick = document.querySelector(`#filter-buttons .btn_gal[data-filter="${filterValue}"]`);
            if (buttonToClick) {
                buttonToClick.click();
            }
        });
    });

    // Evento click para los botones de la galería
    document.querySelectorAll('#filter-buttons .btn_gal').forEach(button => {
        button.addEventListener('click', function(event) {
            const filterValue = button.getAttribute('data-filter');

            // Actualizar botones y enlaces activos
            synchronizeActiveButtons(filterValue);
        });
    });
});

