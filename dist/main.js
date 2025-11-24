import { AppError } from "./utils/errorHandlers.js";
import { Country } from "./models/country.js";
import { fetchAllCountries, fetchCountryByCode } from "./services/apiServices.js";
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
// processCountryData();
processCountryByCode("NPL");
//# sourceMappingURL=main.js.map