"use strict";

var country_searched = document.querySelector("form input");
var button = document.querySelector("form button");
var form = document.querySelector("form");
var flag = document.querySelector(".flag img");
var countryName = document.querySelector(".flag .name");
var cpt = document.querySelector(".capital");
var continent = document.querySelector(".continent");
var people = document.querySelector(".people");
var language = document.querySelector(".language");
var money = document.querySelector(".money");
var localisation = document.querySelector(".localisation");
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
country_searched.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    searchCounty();
  }
});
button.addEventListener("click", searchCounty);

function searchCounty() {
  var country = country_searched.value;
  var url = "https://restcountries.com/v3.1/name/".concat(country);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);

    if (data[0].name.common) {
      flag.src = data[0].flags.png;
      countryName.textContent = data[0].name.common;
      cpt.textContent = "Capital : ".concat(data[0].capital[0]);
      continent.textContent = "Continent : ".concat(data[0].continents[0]);
      people.textContent = "Population : ".concat(data[0].population);
      var lang = data[0].languages;

      if (lang[Object.keys(lang)[0]] && lang[Object.keys(lang)[1]]) {
        language.textContent = "Common Languages : ".concat(lang[Object.keys(lang)[0]], " and ").concat(lang[Object.keys(lang)[1]], " ");
      } else {
        language.textContent = "Common Languages : ".concat(lang[Object.keys(lang)[0]], " ");
      }

      var currency = data[0].currencies;
      money.textContent = "Currency : ".concat(currency[Object.keys(currency)[0]].symbol, "  ").concat(currency[Object.keys(currency)[0]].name);
      console.log(data[0].maps.googleMaps);
      localisation.href = data[0].maps.googleMaps;
      var localisationCountry = data[0].maps.googleMaps;
      localisation.textContent = "Click here to see the localisation";
    } else {
      alert("This contry could not be found");
    }
  });
}

searchCounty();