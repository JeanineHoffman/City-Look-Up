'use strict'

// map.flyTo({center: e.features[0].geometry.coordinates});
// map.flyTo({center: coordinates});
const loadMap = (cityCoordinates) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiamVhbmluZWgiLCJhIjoiY2p1dW9pOWdhMGw0bTQzcWhnOTgyYXVraiJ9.ol6UTML3-IKNBMqdncW2Mw';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
    center: cityCoordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
  $('.hidden').toggleClass('hidden');
}


function getCityMap(cityName) {
console.log(cityName);

  const searchURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  const accessToken = 'pk.eyJ1IjoiamVhbmluZWgiLCJhIjoiY2p1dW9pOWdhMGw0bTQzcWhnOTgyYXVraiJ9.ol6UTML3-IKNBMqdncW2Mw';
  const queryString = `${encodeURIComponent(cityName)}.json?`;
  const url = searchURL + queryString + `access_token=${accessToken}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        let responseJson = response.json();
        return responseJson;
      }
      throw new Error(response.statusText);
    })
    .then(cityGeoCodeInfo => {
      let coords = cityGeoCodeInfo.features[0].center;
      console.log(cityGeoCodeInfo.features[0].center)
      loadMap(coords);
    });
}