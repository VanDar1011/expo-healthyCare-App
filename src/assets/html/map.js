export default html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.js"></script>
  <link href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css" rel="stylesheet" />
  <style>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGF0bXBhYnhvIiwiYSI6ImNtMXpxamlzczBhbmYybHB3ZXB0bGJjZDUifQ.7HhBoEhzvS5NHt8CYi4cTg'; // Thay bằng token của bạn
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
     center: [106.728, 10.795],
      zoom: 12
    });
 const startCoords = [106.728, 10.795]; // Tọa độ điểm bắt đầu
    const endCoords = [106.835, 10.868];
map.on('error', function(e) {
    console.error('Map error: ', e);
  });
 fetch('https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=sk.eyJ1IjoiZGF0bXBhYnhvIiwiYSI6ImNtMXpxcXNhMTBheTUycXNnY3k4amxsdW4ifQ.7urK753NRaKZwm8DcSeMBg')
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry.coordinates;
        
        // Vẽ đường đi
        const routeLine = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };

        // Vẽ lên bản đồ
        map.on('load', () => {
          map.addSource('route', {
            type: 'geojson',
            data: routeLine
          });

          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': 'blue',
              'line-width': 5
            }
          });
        });
      })
      .catch(error => console.error('Error fetching directions:', error));
  </script>
</body>
</html>`;
