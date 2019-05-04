'use strict';

function displayResults(teleportTester) {
  let resultsHTML = teleportTester.categories.map((item, index) => {
    let barWidth = `${item.score_out_of_10 * 10}%`;
    let score = Math.round(item.score_out_of_10 * 10) / 10; // formats a results to a value out of 10, rounded to the first decimal
    return `<div class="item-wrapper">
        <div id="item-${index}">
          <div class="category-title"><span>${item.name}</span><span>${score}</span></div>
          <div class="graph-cont">
            <div class="bar-graph" style="width:${barWidth}; background-color:${item.color};"></div>
          </div>
        </div>
      </div>`
  }).join('');
  $('#results-list').append(resultsHTML);
};

function displayPhotos(teleportTester){
  console.log(teleportTester.photos[0]); //built in Teleport photo finder that replaced our photos.js file. displays object with image url and source
    let imageSource = `url('${teleportTester.photos[0].image.web}')`;
    let photographer = teleportTester.photos[0].attribution.photographer;
    let photoWebsite = teleportTester.photos[0].attribution.site;
    let photoSourceURL = teleportTester.photos[0].attribution.source;
    let attribution = `Image by ${photographer} via ${photoWebsite}`;
    $('.photo-container .photo-caption .photo-link').attr("href", photoSourceURL);
    $('.photo-container .photo-caption .photo-link').text(attribution);
    $('.photo-container').css('background-image', imageSource);
}


function livingCosts(teleportTester){
 console.log(teleportTester); //returns an object with various specific city information
 teleportTester.categories[3].data.shift();
 let resultsHTML = teleportTester.categories[3].data.map((item, index) =>{
 console.log(item);
 let amount = (item.currency_dollar_value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); //converts all numeric values to US Dollar format.
 let barWidth=`${100}%`;
  return `<div class="item-wrapper">
  <div id="cost-${index}">
    <div class="category-title"><span>${item.label}:</span><span>$${amount}</span></div>
    <div class="info-cont"></div>
  </div>
</div>`
}).join('');
$('#living-results').append(resultsHTML);
}


function getCityStats(placeName) {
  let teleportBaseURL = 'https://api.teleport.org/api/urban_areas/slug:'; //all teleport city calls take a "slugID" which is saved in an object from index.js and used in template literals for the following array
  const searchURLs = [`${teleportBaseURL}${placeName}/scores`, `${teleportBaseURL}${placeName}/images`, `${teleportBaseURL}${placeName}/details`];
  Promise.all(searchURLs.map(url =>
    fetch(url)
      .then(checkResults)
      .then(response => response.json())
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      })))
    // calls all teleport functions simultaneously
    .then(data => {
      const qualityOfLife = data[0];
      const qualityOfPhotos = data[1];
      const costOfLiving = data[2];

      console.log(data[0], data[1], data[2])
      displayResults(qualityOfLife);
      displayPhotos(qualityOfPhotos);
      livingCosts(costOfLiving);

    })
}

function checkResults(response) {
  if (response.ok) {
    return Promise.resolve(response);
  }
  throw new Error(response.statusText);
}

