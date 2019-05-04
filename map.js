'use strict'

const loadMap = (cityCoordinates) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiamVhbmluZWgiLCJhIjoiY2p1dW9pOWdhMGw0bTQzcWhnOTgyYXVraiJ9.ol6UTML3-IKNBMqdncW2Mw';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
    center: cityCoordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
  });

  map.on('load', function() {
    map.resize(); //resized map to match photo container
  });

  $('.hidden').toggleClass('hidden');
}

