const country_searched = document.querySelector("form input");
const button = document.querySelector("form button");
const form = document.querySelector("form");

const flag = document.querySelector(".flag img");
const countryName = document.querySelector(".flag .name");
const cpt = document.querySelector(".capital");
const continent = document.querySelector(".continent");
const people = document.querySelector(".people");
const language = document.querySelector(".language");
const money = document.querySelector(".money");
const localisation = document.querySelector(".localisation");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
});

country_searched.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        searchCounty();
    }
});

button.addEventListener("click", searchCounty);

function searchCounty(){
    
    const country = country_searched.value;
    const url = `https://restcountries.com/v3.1/name/${country}`
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        if(data[0].name.common){
            flag.src = data[0].flags.png;
            countryName.textContent = data[0].name.common;
            
            cpt.textContent = `Capital : ${data[0].capital[0]}`
            continent.textContent = `Continent : ${data[0].continents[0]}`

            people.textContent = `Population : ${data[0].population}`

            const lang = data[0].languages;
            
            if(lang[Object.keys(lang)[0]] && lang[Object.keys(lang)[1]]){

                language.textContent = `Common Languages : ${lang[Object.keys(lang)[0]]} and ${lang[Object.keys(lang)[1]]} `
            }

            else{
                language.textContent = `Common Languages : ${lang[Object.keys(lang)[0]]} `
            }

            
            const currency = data[0].currencies
            money.textContent = `Currency : ${currency[Object.keys(currency)[0]].symbol}  ${currency[Object.keys(currency)[0]].name}`
            
            console.log(data[0].maps.googleMaps)

           localisation.href = data[0].maps.googleMaps;
           const localisationCountry = data[0].maps.googleMaps;
          
           localisation.textContent = `Click here to see the localisation`;
            

        }

        else{
            alert("This contry could not be found");
        }
    })
}

searchCounty()