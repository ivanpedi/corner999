let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
} else {
    alert("Los servicios de geolocalización no están disponibles");
}

function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Coordenadas personalizadas para cada mapa
    let coords1 = [latitude, longitude];
    let coords2 = [latitude, longitude];
    let coords3 = [latitude, longitude];

    // Icono personalizado para el final de la ruta
    let finIcon = L.icon({
        iconUrl: '../assets/img/contacto/logo1-map.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });

    // Función para crear un mapa y configurar la ruta
    function createMap(mapId, startCoords, endCoords) {
        let map = L.map(mapId, {
            center: startCoords,
            zoom: 14
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">CORNER-SHOP</a>'
        }).addTo(map);

        let control = L.Routing.control({
            waypoints: [
                L.latLng(startCoords[0], startCoords[1]),
                L.latLng(endCoords[0], endCoords[1])
            ],
            language: 'es',
            draggableWaypoints: true,
            createMarker: function (i, wp, nWps) {
                // Crear marcadores arrastrables para inicio y fin
                if (i === 0) {
                    return L.marker(wp.latLng, { draggable: true }).bindPopup('Inicio').addTo(map);
                } else if (i === nWps - 1) {
                    return L.marker(wp.latLng, { icon: finIcon, draggable: true }).bindPopup('Fin').addTo(map);
                }
            }
        }).addTo(map);

        // Añadir una capa de rutas personalizada
        control.on('routesfound', function (e) {
            let route = e.routes[0];
            let routePoints = route.coordinates;
            L.polyline(routePoints, { color: 'blue' }).addTo(map);
        });
    }

    // Crear mapas con diferentes coordenadas
    createMap('map', coords1, [36.524606, -6.287046]);//Mapa de la tienda de Cadiz
    createMap('map2', coords2, [36.686290, -6.126083]);//Mapa de la tienda de Jerez
    createMap('map3', coords3, [36.467951, -6.194233]);// Mapa de la tienda de san Fernando
}

function error() {
    // Si hay un error, puedes configurar un mapa de fallback, aquí solo mostramos uno
    let map = L.map('map', {
        center: [37.17059, -3.06552],
        zoom: 14
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">CORNER-SHOP</a>'
    }).addTo(map);
}


