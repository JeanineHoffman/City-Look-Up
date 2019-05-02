'use strict';

function displayResults(teleportTester) {
  let resultsHTML = teleportTester.categories.map((item, index) => {
    let barWidth = `${item.score_out_of_10 * 10}%`;
    let score = Math.round(item.score_out_of_10 * 10) / 10;
    return `<div id="item-${index}">
      <div class="category-title"><span>${item.name}</span><span>${score}</span></div>
      <div class="graph-cont">
        <div class="bar-graph" style="width:${barWidth};"></div>
      </div>
    </div>`
  }).join('');
  $('#results-list').append(resultsHTML);
};

function displaySalaries(teleportTester) {
  let resultsHTML = teleportTester.salaries.map((item, index) => {
    let barWidth = item.percentile_50;
    //console.log(barWidth);
    let salary = item.percentile_50;
    return `<div id="item-${index}">
    <div class="category-title"><span>${item.job.id}</span><span>${salary}</span></div>
    <div class="graph-cont">
      <div class="bar-graph" style="width:${barWidth};"></div>
    </div>
  </div>`
  }).join('');
  //console.log(resultsHTML);
  $('#results-list').append(resultsHTML);
};

function getCityStats(placeName) {
  console.log(placeName);

  let teleportBaseURL = 'https://api.teleport.org/api/urban_areas/slug:';
  const searchURLs = [`${teleportBaseURL}${placeName}/scores`, `${teleportBaseURL}${placeName}/salaries`];
  Promise.all(searchURLs.map(url =>
    fetch(url)
      .then(checkResults)
      .then(response => response.json())
      //.then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      })))
    //$('#results').addClass('hidden');console.log(responseJson);
    // calls all teleport functions simultaneously
    .then(data => {
      const qualityOfLife = data[0];
      const qualityOfSalaries = data[1];

      console.log(data[0], data[1])

      displayResults(qualityOfLife);
      // displaySalaries(qualityOfSalaries);
    })
}

function checkResults(response) {
  if (response.ok) {
    //console.log(response);
    return Promise.resolve(response);
  }
  throw new Error(response.statusText);
}

//getAllTeleportData();