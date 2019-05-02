'use strict'


function getCityPhoto(cityName) {
    const searchURL = 'https://api.unsplash.com/photos/random?';
    let params = {
        client_id: '753157f93e4e369f2c7c4a8ea50bd6594cf8289302bdebdb5f4e180fac95809e',
        query: cityName,
        orientation: "landscape",
        page: 1,
    };

    let restOfURL = formatQueryString(params);
    let fullQueryURL = `${searchURL}${restOfURL}`;

    fetch(fullQueryURL)
        .then(response => {
            if (response.ok) {
                let responseJson = response.json();
                return responseJson;
            }
            throw new Error(response.statusText);
        })
        .then(photoInfo => {
            // Get the image and display it
            displayPhoto(photoInfo);
        })
        .catch(err => {
            console.log(err.message);
            displayNoPhoto();
        });
}

function formatQueryString(paramsObject) {
    let keys = Object.keys(paramsObject);
    return keys.map(key => {
        let theValue = encodeURIComponent(paramsObject[key]);
        return `${key}=${theValue}`;
    }).join('&');
}

// Get the image and display it
function displayPhoto(photoInfo, isOK) {
    console.log(`url('${photoInfo.urls.regular}')`);
    let imageSource = `url('${photoInfo.urls.regular}')`;
    $('.photo-container').css('background-image', imageSource);
}

function displayNoPhoto() {
    let imageSource = `url('assets/no-image.png')`;
    $('.photo-container').css('background-image', imageSource);
}