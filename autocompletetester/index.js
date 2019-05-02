'use strict';


function watchForm() {
    var $results = document.querySelector('.results');
    var appendToResult = $results.insertAdjacentHTML.bind($results, 'afterend');
    TeleportAutocomplete.init('.my-input').on('change', function(value) { console.log(value);
    appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
      //$('#city-search-form').change(event => {
        event.preventDefault();
        const mapboxSearchTerm = `${value.name}, ${value.admin1DivisionCode}`;
        const teleportSearchTerm = value.uaSlug;
        $("#results-list").empty();
        console.log(mapboxSearchTerm);
        console.log(teleportSearchTerm);
        getCityMap(mapboxSearchTerm);
        getCityStats(teleportSearchTerm);
        getCityPhoto(mapboxSearchTerm);        
    });
}


$(watchForm);

