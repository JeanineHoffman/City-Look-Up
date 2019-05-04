'use strict';


function watchForm() {
   var $results = document.querySelector('.results');
    TeleportAutocomplete.init('.my-input').on('change', function(value) { console.log(value);
   // console.log(JSON.stringify(value, null, 2))
      //$('#city-search-form').change(event => {
        event.preventDefault();
        const mapboxSearchTerm = [value.longitude, value.latitude];
        const photoSearchTerm = `${value.name}, ${value.admin1DivisionCode}`;
        const teleportSearchTerm = value.uaSlug;
        if (value.hasOwnProperty('uaSlug')){
          $("#results-list").empty();
          $("#living-results").empty();
          loadMap(mapboxSearchTerm);
          getCityStats(teleportSearchTerm);
          getCityPhoto(photoSearchTerm);        
        }
        else {
          loadMap(mapboxSearchTerm)
          getCityPhoto(photoSearchTerm)
          $("#results-list").html(`<p class="search-error">There is no quality of life data for ${value.title}.</p>`);
        }
    });
}
    //var appendToResult = $results.insertAdjacentHTML.bind($results, 'afterend');


$(watchForm);

