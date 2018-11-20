mapboxgl.accessToken = "pk.eyJ1IjoiZHB3cyIsImEiOiJjam9xNnA2ejQwMXVuM2trdzM1NDNwenphIn0.D9fqocDkbnW0DDIacSZ2bw";


const defaultLong = -82.34944;
const defaultLat = 29.64833;
const defaultZoom = 12;

/* Map: This represents the map on the page. */
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v9",
  zoom:12,
  center: [defaultLong,defaultLat]
});



map.on("load", function () {
  /* Image: An image is loaded and added to the map. */
  map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
      if (error) throw error;
      map.addImage("custom-marker", image);


      /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
      getEvents(eventsJSON => {

        var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });


        eventsJSON.map(event => {
////
          mapboxClient.geocoding.forwardGeocode({
              query: event.address,
              autocomplete: false,
              limit: 1
          })
              .send()
              .then(function (response) {
                  if (response && response.body && response.body.features && response.body.features.length) {
                      var feature = response.body.features[0];
                      new mapboxgl.Marker()
                          .setLngLat(feature.center)
                          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                          .setHTML('<h3>' + event.name + '</h3><p>' + event.description + '</p>'))
                          .addTo(map);
                  }
              });

          ////////
        });

    });//end getEvents


    });//end loadimage
}); //end mapon







/*
L.mapbox.accessToken = 'pk.eyJ1IjoiZHB3cyIsImEiOiJjam9xNnA2ejQwMXVuM2trdzM1NDNwenphIn0.D9fqocDkbnW0DDIacSZ2bw';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([29.64833, -82.34944], 12);

getEvents(eventsJson => eventsJson.map(event => drawMarker(event)));

function drawMarker(event){

  const long = 29.64833;
  const lat = -82.34944;
  map.addLayer({
        id: "markers",
        type: "symbol",*/
        /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
        /*source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features:[
              {
                "type":"Feature",
                "geometry":{
                  "type":"Point",
                  "coordinates":[long,lat]
                }
              }
            ]
          }
        },
        layout: {
          "icon-image": "custom-marker",
        }
      });
}
*/
function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

function center(long, lat){

}
