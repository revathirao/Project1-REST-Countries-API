import { AppError } from "./utils/errorHandlers.js";
import { Country } from "./models/country.js";
import { fetchAllCountries, fetchCountryByCode, fetchCountryByRegion } from "./services/apiServices.js";
async function processCountryData() {
    try {
        const countries = await fetchAllCountries();
        countries.forEach(c => {
            console.log(c.displayDetails());
            console.log("--------------------------------------------");
        });
    }
    catch (error) {
        if (error instanceof AppError) {
            console.error(`API Error (${error.status}): ${error.message}`);
        }
        else {
            console.error("Unexpected Error:", error);
        }
    }
}
async function processCountryByCode(code) {
    try {
        const country = await fetchCountryByCode(code);
        console.log(country.displayDetails());
    }
    catch (error) {
        console.error(error.message);
    }
}
async function processCountryByRegion(region) {
    try {
        const countriesByRegion = await fetchCountryByRegion(region);
        countriesByRegion.forEach(c => {
            console.log(c.displayDetails());
            console.log("--------------------------------------------");
        });
        // fetch country by region
        // const countries = await fetchAllCountries();
        // const asianCountries = countries.filter(c => c.region === "Asia");
    }
    catch (error) {
        console.error(error.message);
    }
}
// processCountryData();
// processCountryByCode("NPL")
processCountryByRegion("Africa");
//# sourceMappingURL=main.js.map