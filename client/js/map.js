L.mapbox.accessToken = 'pk.eyJ1IjoiZHB3cyIsImEiOiJjam9xNnA2ejQwMXVuM2trdzM1NDNwenphIn0.D9fqocDkbnW0DDIacSZ2bw';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([29.64833, -82.34944], 12);


function mapsInit(){
}

function bubbbb() {
  const lat = getElement("lat").value;
  const long = getElement("long").value;
  const zoom = 3;
}

function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

function center(long, lat){

}
