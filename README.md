# City Look-up
[Live Demo Here](https://thinkful-nights-weekends-codename-camel.github.io/citysearchAPIhack/)

![City Look-up app screenshot](https://raw.githubusercontent.com/thinkful-nights-weekends-codename-camel/citysearchAPIhack/master/city-lookup-app-screenshot.jpg)
---
### App Summary
City Look-up app lets users find out liveability information about selected cities. The user types a city of interest into the search field, and the app will display a map and photo of the city, as well as a list of zero-out-of-ten scores for various liveability factors. By _liveability factors_ we mean qualities such as housing, healthcare, leisure, safety, cost of living, and tolerance.

### Tech Stack
City Look-up uses HTML, CSS, Javascript and JQuery to make everything work. We obtain city liveability qualities from the Teleport API, and maps from the Mapbox GL JS library.
* [Teleport](https://developers.teleport.org/api/): Searches for liveability qualities for a selected city. The Teleport API also has an endpoint that provides a random Unsplash or Flickr image from that city.
* [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/): Specify latitude/longitude values for the selected city (provided by Teleport), and this library will display a nicely styled map of that location.
