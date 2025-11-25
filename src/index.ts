import { AppError } from "./utils/errorHandlers.js";
import { Country } from "./models/country.js";
import { fetchAllCountries, fetchCountryByCode, fetchCountryByRegion } from "./services/apiServices.js"

const grid: HTMLElement = document.getElementById("country-grid")!//!! tells TS that the element exists (never null).
const searchInput: HTMLInputElement = document.getElementById("search") as HTMLInputElement //HTMLInputElement tells TS the type of input
const regionFilter: HTMLSelectElement = document.getElementById("region-filter") as HTMLSelectElement
const themeTogglebtn: HTMLButtonElement = document.getElementById("theme-toggle") as HTMLButtonElement
const form: HTMLFormElement = document.getElementById("form-group") as HTMLFormElement;

// This array will store all products that come from the API
let allCountries: Country[] = [];


//load all countries on pageLoad
async function loadCountries() {
    allCountries = await fetchAllCountries();
    recerCountries(allCountries)
}



function recerCountries(list: Country[]) {
    grid.innerHTML = "";
    if (!list) {
        grid.innerHTML = `<div class="empty">No products found </div>`
        return;
    }

    const fragment = document.createDocumentFragment();
    list.forEach(function (c) {

        const card = document.createElement("article");
        card.className = "card"

        card.innerHTML =
    `<div class="country-card" data-code="${c.code}">
        <img src="${c.flag}" alt="${c.name} flag">
        <h3>${c.name}</h3>
        <p>Population: ${c.formattedPopulation()}</p>
        <p>Region: ${c.region}</p>
        <p>Capital: ${c.capital}</p>
    </div>`
    
    //Add event listener to each card
        card.addEventListener("click", function(){
            // Sets the URL of the current browser window, initiating a page redirect.
            window.location.href =
                // The path to the new HTML page being loaded.
                `country.html` +
                // Starts the query parameter string, passing data to the new page.
                `?code=` +
                // Dynamically inserts the value from the 'code' property of the 'c' object.
                `${c.code}`;
        });
        fragment.appendChild(card);
    });
    grid.appendChild(fragment)
}








