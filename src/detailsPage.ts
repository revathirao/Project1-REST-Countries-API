import { fetchAllCountries, fetchCountryByCode, fetchCountryByRegion } from "./services/apiServices.js"
import { AppError } from "./utils/errorHandlers.js";
import { Country } from "./models/country.js";
import { setupDarkMode } from "./utils/theme.js";


// This line waits until the basic HTML structure of the page has fully loaded.
// It ensures that all elements exist on the page before we try to interact with them.
document.addEventListener("DOMContentLoaded", () => {
    setupDarkMode();
});

const container = document.getElementById("detail-container") as HTMLDivElement| null; //allows TypeScript to know the element might not exist.
const backBtn = document.getElementById("back-btn") as HTMLButtonElement| null;
const detailSection= document.getElementById("detail-section") as HTMLElement| null;
const listSection = document.getElementById("list-section") as HTMLElement| null;


    // window.location.search gets the query string from the browser's address bar (e.g., "?code=USA").
    // new URLSearchParams() is a built-in tool that makes it easy to read these parameters.
    const parameters = new URLSearchParams(window.location.search);
    // Use the .get() method to look for a specific key within the parameters.
    const countryCode = parameters.get("code");


    // Load details when page opens
if (countryCode) {
    showCountryDetails(countryCode);
} 
 // <p><strong>Native Name:</strong> ${c.nativeName}</p>
// <p><strong>Currency:</strong> ${c.currencies}</p>
// <p><strong>Languages:</strong> ${c.languages}</p>


async function showCountryDetails(code: string) {

    //fetch the data The function returns a single 'Country' object, so store it as one.
    const c = await fetchCountryByCode(code);


    const tld = c.tld ? c.tld.join(", ") : "N/A";
// detailsContainer.innerHTML += `
   

       // The ! tells TypeScript “I guarantee this is not null.”
        container!.innerHTML = `
            <div class="detail-card">
            <img src="${c.flag}" alt="${c.name} flag" class="detail-flag">
            <h2>${c.name}</h2>
            <p><strong>Native Name:</strong> ${c.nativeName.join(", ")}</p>
            <p><strong>Population:</strong> ${c.formattedPopulation()}</p>
            <p><strong>Region:</strong> ${c.region}</p>
            <p><strong>Sub Region:</strong> ${c.subregion}</p>
            <p><strong>Capital:</strong> ${c.capital}</p>
            <p><strong>Top Level Domain:</strong> ${c.tld}</p>
            <p><strong>Currencies:</strong> ${c.currencies.join(", ")}</p>
            <p><strong>Languages:</strong> ${c.languages.join(", ")}</p> 
            <div id="border-container"></div> `;
        
            renderBorderCountries(c.borders);   
}

backBtn?.addEventListener("click", function () {
    // if (detailSection) detailSection.style.display = "none";
    // if (listSection)listSection.style.display = "block";
    window.history.back();
});

// The function is marked as 'async' because it uses the 'await' keyword inside.
// It accepts one argument, 'borders', which is expected to be an array of country codes (strings).

async function renderBorderCountries(borders: string[] = []) {
    // Get the HTML element where the border country buttons will be placed.
    const borderContainer = document.getElementById("border-container")!;

    // Check if the 'borders' array is null, undefined, or empty.
    if (!borders || borders.length === 0) {
      
        // If there are no borders, set the container's HTML to a simple "None" message
        // and exit the function early.
        borderContainer.innerHTML = `<p><strong>Border Countries:</strong> None</p>`; 
        return}

         // If there are borders, start building the container's content with an initial label.
        borderContainer.innerHTML = `
        <p><strong>Border Countries:</strong></p>
        <div class="border-buttons"></div>`;
        
        const btnContainer = borderContainer.querySelector(".border-buttons") as HTMLElement;
        // Loop through each country code provided in the 'borders' array.
        for (let code of borders) {
            // 'await' pauses the loop until the 'fetchCountryByCode' function
            // (which we assume is defined elsewhere and returns a Promise)
            // successfully retrieves the full country data object 'b'.
            const b = await fetchCountryByCode(code);

            // Create a new HTML <button> element dynamically.
            const btn = document.createElement("button");
            // Add a CSS class to the button for styling purposes.
            btn.className = "border-btn";
            // Set the visible text of the button to the name of the fetched country.
            btn.textContent = b.name;

            // Add an event listener that executes a function when the button is clicked.
            btn.addEventListener("click", () => {
                // This calls another function (showCountryDetails) with the
                // country code, presumably to load details for that specific country
                // without reloading the entire web page.
                showCountryDetails(b.code);
            });

            // Append the newly created and configured button to the main container element in the DOM.
            btnContainer .appendChild(btn);
        }
    }



