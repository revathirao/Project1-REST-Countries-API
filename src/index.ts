import { AppError } from "./utils/errorHandlers.js";
import { Country } from "./models/country.js";
import { fetchAllCountries, fetchCountryByCode, fetchCountryByRegion } from "./services/apiServices.js"
import { setupDarkMode } from "./utils/theme.js";

setupDarkMode();
const grid: HTMLElement = document.getElementById("list-section")!//!! tells TS that the element exists (never null).
const searchInput: HTMLInputElement = document.getElementById("search") as HTMLInputElement //HTMLInputElement tells TS the type of input
const regionFilter: HTMLSelectElement = document.getElementById("region-filter") as HTMLSelectElement
const themeTogglebtn: HTMLButtonElement = document.getElementById("theme-toggle") as HTMLButtonElement
const emptyDiv = document.querySelector(".empty") as HTMLElement;

// This array will store all products that come from the API
let allCountries: Country[] = [];
let filteredCopy: Country[] = [];


//load all countries on pageLoad
async function loadCountries() {
    allCountries = await fetchAllCountries();
    filteredCopy = [...allCountries]; // update global copy

    console.log("Fetched countries:", allCountries);  // ← Check this
    rendeerCountries(allCountries)
}

function rendeerCountries(list: Country[]) {
   
   

    // Hide empty div when we have results
    if (list && list.length > 0) {
        emptyDiv.style.display = "none";
    } else {
        emptyDiv.style.display = "block";
        emptyDiv.textContent = "No countries found";
    } grid.innerHTML = "";
    if (!list) {
        grid.innerHTML = `<div class="empty">No products found </div>`
        return;
    }

    const fragment = document.createDocumentFragment();
    list.forEach(function (c) {

        const card = document.createElement("article");
        card.className = "card"

        card.innerHTML =
            `    <div class="country-card">
        <!-- The alt text is descriptive and helpful -->
        <img src="${c.flags}" alt="Flag of ${c.name}">
        
        <!-- Use strong tags for importance/emphasis -->
        <h3>${c.name}</h3>
        <p><strong>Population:</strong> ${c.formattedPopulation()}</p>
        <p><strong>Region:</strong> ${c.region}</p>
        <p><strong>Capital:</strong> ${c.capital}</p>
    </div>
`

        //Add event listener to each card
        card.addEventListener("click", function () {
            // Sets the URL of the current browser window, initiating a page redirect.
            window.location.href = `countryCard.html?code=${c.code}`
            /* The path to the new HTML page being loaded.
            - countryCard.html
            -Starts the query parameter string, passing data to the new page.
            -?code=
            -Dynamically inserts the value from the 'code' property of the 'c' object.
           // ${c.code}*/

        });
        fragment.appendChild(card);
    });
    grid.appendChild(fragment)
}

loadCountries()


searchInput.addEventListener("input", function () {

    regionFilter.value = ""; //prevents region from interfering
    const inputText = searchInput.value.trim().toLowerCase();

    if (!inputText) {
        rendeerCountries(allCountries);
        return;
    }

    const regex = new RegExp(`^${inputText}`, "i");

    const results = allCountries.filter(c =>
    //     (c.name && c.name.toLowerCase().match(regex)) ||
    //     (c.region && c.region.toLowerCase().match(regex))
//     // );

//     rendeerCountries(results);
// });
    c.name.toLowerCase().match(regex)
    );

    if (results.length === 0) {
        grid.innerHTML = `<div class="empty">No countries found</div>`;
    } else {
        rendeerCountries(results);
    }
});

//region filter
regionFilter.addEventListener("change", async function () {
    searchInput.value =""
    const region = regionFilter.value;
    if (regionFilter.value === "") {
        rendeerCountries(allCountries);
    } else {
        const filtered = await fetchCountryByRegion(regionFilter.value);
        rendeerCountries(filtered);
    }
});










