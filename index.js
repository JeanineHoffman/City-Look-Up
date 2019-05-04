'use strict';


function watchForm() {
    TeleportAutocomplete.init('.my-input').on('change', function(value) { console.log(value); //autocomplete widget - returns object containing geocodeId and slugID
        event.preventDefault();
        const mapboxSearchTerm = [value.longitude, value.latitude];
        const teleportSearchTerm = value.uaSlug;
        if (value.hasOwnProperty('uaSlug')){ //uaSlug determines whether or not API has quality of life data for selected city
          $("#results-list").empty();
          $("#living-results").empty();
          $("#cost-header").removeClass(".hidden");
          $("#life-header").removeClass(".hidden");

          loadMap(mapboxSearchTerm);
          getCityStats(teleportSearchTerm);
        }
        else { //if the requested city is missing a "slugID"
          loadMap(mapboxSearchTerm)
          $("#results-list").html(`<p class="search-error">There is no quality of life data for ${value.title}.</p>`);
          $("#living-results").empty();
        }
    });
}


$(watchForm);
/* The autocomplete widget used here was slightly controversial in our discussion with Al - but we were able to 
demonstrate that our project satisfied all the learning requirements for APIs while still borrowing code to use.
The purpose of this autocomplete was to make the app more user-friendly and to make it impossible for a user to break
the app by submitting gibberish/incomplete city information, while still showing that we knew how to handle exceptions
 (try searching Eskişehir, Turkey in the bar - you will get a message saying that there is no quality of life information
  for that city). */




   //var $results = document.querySelector('.results');


