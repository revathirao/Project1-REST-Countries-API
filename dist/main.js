import { AppError } from "./utils/errorHandlers.js";
import { Country } from "./models/country.js";
import { fetchAllCountries } from "./services/apiServices.js";
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
processCountryData();
//# sourceMappingURL=main.js.map