import { fetchAllCountries, fetchCountryByCode, fetchCountryByRegion } from "./services/apiServices.js"
import { setupDarkMode } from "./utils/theme.js";


// This line waits until the basic HTML structure of the page has fully loaded.
// It ensures that all elements exist on the page before we try to interact with them.
document.addEventListener("DOMContentLoaded", () => {
    // Initializes dark mode functionality when the DOM is ready
    setupDarkMode();
});

const detailContainer = document.getElementById("detail-container") as HTMLDivElement | null; //allows TypeScript to know the element might not exist.
const backBtn = document.getElementById("back-btn") as HTMLButtonElement | null;

// window.location.search gets the query string from the browser's address bar (e.g., "?code=USA").
// new URLSearchParams() is a built-in tool that makes it easy to read these parameters.
const parameters = new URLSearchParams(window.location.search);
// Use the .get() method to look for a specific key within the parameters.
const countryCode = parameters.get("code");

console.log("Country Code:", countryCode);

// Load details when page opens
// If a country code is found in the URL, fetch and display its details
if (countryCode) {
    showCountryDetails(countryCode);
}


/**
 * Fetches data for a specific country by its code and renders the details to the page.
 * @param code The 3-letter ISO country code.
 */
async function showCountryDetails(code: string) {

    //fetch the data The function returns a single 'Country' object, so store it as one.
    const c = await fetchCountryByCode(code);

    // The ! tells TypeScript “I guarantee this is not null.”
    // TypeScript non-null assertion operator (!) is used, assuming detailContainer exists when this function is called
    detailContainer!.innerHTML = `
    <div class="detail-content-wrapper">

        <!-- LEFT COLUMN: FLAG -->
        <div class="flag-container">
            <img src="${c.flags}" class="detail-flag" alt="Flag of ${c.name}">
        </div>

        <!-- RIGHT COLUMN: TEXT DETAILS -->
        <div class="details-text-container">
            <h2 id="country-title">${c.name}</h2>

            <!-- Two-column layout -->
            <div class="details-grid">

                <!-- LEFT COLUMN INFO -->
                <div class="details-col-left">
                    <p><strong>Native Name:</strong> ${c.nativeName.join(", ")}</p>
                    <p><strong>Population:</strong> ${c.formattedPopulation()}</p>
                    <p><strong>Region:</strong> ${c.region}</p>
                    <p><strong>Sub Region:</strong> ${c.subregion}</p>
                    <p><strong>Capital:</strong> ${c.capital}</p>
                </div>

                <!-- RIGHT COLUMN INFO -->
                <div class="details-col-right">
                    <p><strong>Top Level Domain:</strong> ${c.tld}</p>
                    <p><strong>Currencies:</strong> ${c.currencies.join(", ")}</p>
                    <p><strong>Languages:</strong> ${c.languages.join(", ")}</p>
                </div>

            </div>

            <!-- BORDER COUNTRY BUTTONS INSERT HERE -->
            <div id="border-container" aria-live="polite"></div>
        </div>
    </div>
    `;
    
    // Once primary details are rendered, fetch and render border countries asynchronously
    renderBorderCountries(c.borders);
}

// Add event listener to the "Back" button to use browser history navigation
backBtn?.addEventListener("click", function () {
    window.history.back();
});


/**
 * Fetches full names of border countries using their codes and creates clickable buttons for each.
 *  The function is marked as 'async' because it uses the 'await' keyword inside.
 * It accepts one argument, 'borders', which is expected to be an array of country codes (strings).
 * @param borders An array of 3-letter country codes of bordering nations.
 */
async function renderBorderCountries(borders: string[] = []) {
   
    // Get the HTML element where the border country buttons will be placed.
    const borderContainer = document.getElementById("border-container")!;

    // Check if the 'borders' array is null, undefined, or empty.
    if (!borders || borders.length === 0) {

        // If there are no borders, set the container's HTML to a simple "None" message
        // and exit the function early.
        borderContainer.innerHTML = `<p><strong>Border Countries:</strong> None</p>`;
        return
    }

    // If there are borders, start building the container's content with an initial label.
    borderContainer.innerHTML = `
        <p><strong>Border Countries:</strong></p>
        <div class="border-buttons"></div>`;

    // Get the specific div where buttons will be appended
    const btnContainer = borderContainer.querySelector(".border-buttons") as HTMLElement;

    // Loop through each country code provided in the 'borders' array.
    for (let code of borders) {
        try {
        // 'await' pauses the loop until the 'fetchCountryByCode' function
        // which we assume is defined elsewhere and returns a Promise
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
        btnContainer.appendChild(btn);
    } catch (error) {
            // Handle errors for individual border fetches gracefully (e.g., if one code is invalid)
            console.error(`Failed to fetch details for border code ${code}`, error);
            // Optionally, create a disabled button or a placeholder for the error
        }
    }
}



