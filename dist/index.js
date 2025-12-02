import { AppError } from "./utils/errorHandlers.js";
import { Country } from "./models/country.js";
import { fetchAllCountries, fetchCountryByCode, fetchCountryByRegion } from "./services/apiServices.js";
import { setupDarkMode } from "./utils/theme.js";
// Initialize dark mode settings when the script loads
setupDarkMode();
// Select DOM elements and use non-null assertions (!) as they are expected to be present
// The '!' asserts to TypeScript that these elements will definitely exist after the script loads.
const grid = document.getElementById("list-section"); //!! tells TS that the element exists (never null).
const searchInput = document.getElementById("search"); //HTMLInputElement tells TS the type of input
const regionFilter = document.getElementById("region-filter");
const emptyDiv = document.querySelector(".empty");
// This array will store all products that come from the API
// Global arrays to store raw fetched data and a working filtered copy
let allCountries = [];
let filteredCopy = [];
/**
 * Fetches all country data from the API upon page load, updates global state, and renders the list.
 * load all countries on pageLoad
 */
async function loadCountries() {
    allCountries = await fetchAllCountries();
    filteredCopy = [...allCountries]; // update global copy
    console.log("Fetched countries:", allCountries);
    rendeerCountries(allCountries);
}
/**
 * Renders a list of Country objects into the main grid container.
 * Creates clickable cards for each country.
 * @param list The array of Country objects to display.
 */
function rendeerCountries(list) {
    // Hide empty div when we have results other wise we see always tje load countries text
    if (list && list.length > 0) {
        emptyDiv.style.display = "none";
    }
    else {
        emptyDiv.style.display = "block";
        emptyDiv.textContent = "No countries found";
    }
    // Clears the previous content of the grid container before rendering new cards.
    grid.innerHTML = "";
    if (!list) { // A redundant check since the above `if` handles length zero, but ensures robustness against `null` or `undefined` lists.
        grid.innerHTML = `<div class="empty">No products found </div>`;
        return; // Exits the function if no list is provided
    }
    // Uses a document fragment for efficient DOM manipulation (minimizes reflows/repaints).
    const fragment = document.createDocumentFragment();
    // Iterates over each country object in the list.
    list.forEach(function (c) {
        // Creates a new <article> element for each country card.
        const card = document.createElement("article");
        // Assigns CSS class 'card' to the element.
        card.className = "card";
        // Sets the inner HTML structure for the card using template literals.
        card.innerHTML =
            `  <div class="country-card">
                <!-- The alt text is descriptive and helpful -->
                <img src="${c.flags}" alt="Flag of ${c.name}">
                
                <!-- Use strong tags for importance/emphasis -->
                <h3>${c.name}</h3>
                <p><strong>Population:</strong> ${c.formattedPopulation()}</p>
                <p><strong>Region:</strong> ${c.region}</p>
                <p><strong>Capital:</strong> ${c.capital}</p>
            </div>
                    `;
        //Add event listener to each card
        card.addEventListener("click", function () {
            // Sets the URL of the current browser window, initiating a page redirect.
            window.location.href = `countryCard.html?code=${c.code}`;
            /* The path to the new HTML page being loaded.
            - countryCard.html
            -Starts the query parameter string, passing data to the new page.
            -?code=
            -Dynamically inserts the value from the 'code' property of the 'c' object.
            // ${c.code}*/
        });
        // Appends the created card to the document fragment.
        fragment.appendChild(card);
    });
    // Appends the entire fragment (all cards) to the actual DOM grid container in a single operation.
    grid.appendChild(fragment);
}
// Calls the main data loading function when the script runs initially.
document.addEventListener("DOMContentLoaded", function (event) {
    loadCountries();
});
// Adds an event listener that fires whenever the user types into the search input.
searchInput.addEventListener("input", function () {
    //prevents region from interfering // Resets the region filter dropdown selection to its default (empty) value to avoid conflicting filters.
    regionFilter.value = ""; //prevents region from interfering
    // Gets the current input value, trims whitespace, and converts to lowercase for case-insensitive comparison.
    const inputText = searchInput.value.trim().toLowerCase();
    // Checks if the search input is empty.
    if (!inputText) {
        // If empty, renders all original countries again.
        rendeerCountries(allCountries);
        return; // exit the function
    }
    // Creates a regular expression that matches strings starting with the input text (case-insensitive flag 'i').
    const regex = new RegExp(`^${inputText}`, "i");
    // Filters the *full* list of countries (not the current filtered copy).
    const results = allCountries.filter(c => 
    // Keeps only countries whose names match the regex pattern.
    c.name.toLowerCase().match(regex));
    // Checks if the search yielded any results.
    if (results.length === 0) {
        // Displays a "No countries found" message directly in the grid if none match.
        grid.innerHTML = `<div class="empty">No countries found</div>`;
    }
    else {
        // Renders the filtered results list.
        rendeerCountries(results);
    }
});
//region filter
// Adds an event listener that fires when the user selects a new option in the region dropdown.
regionFilter.addEventListener("change", async function () {
    // Clears the search input field to avoid conflicting filters.
    searchInput.value = "";
    // Gets the selected region value.
    const region = regionFilter.value;
    // Checks if the "All Regions" (empty value) option was selected.
    if (regionFilter.value === "") {
        // If so, renders all original countries.
        rendeerCountries(allCountries);
    }
    else {
        // Asynchronously fetches countries specifically by the selected region using the API service.
        const filtered = await fetchCountryByRegion(regionFilter.value);
        // Renders the newly fetched, region-specific list.
        rendeerCountries(filtered);
    }
});
//# sourceMappingURL=index.js.map