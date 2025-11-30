
import { AppError } from "../utils/errorHandlers.js";
import { Country } from "../models/country.js";


/**
 * Fetches data for all countries from the REST Countries API, maps the response data
 * into an array of `Country` objects, and returns them.
 * @returns A promise that resolves to an array of Country objects.
 * @throws AppError for specific HTTP errors or generic Error for unexpected issues.
 */
export const fetchAllCountries = async (): Promise<Country[]> => {
    try {

        // Fetch specific fields for efficiency: name, cca3, population, region, capital, flags, subregion, currencies, languages, borders
        const response = await fetch
            ("https://restcountries.com/v3.1/all?fields=name,cca3,population,region,capital,flags,subregion,currencies,languages,borders")

        if (!response.ok) {

            // Throw a custom error if the network request fails (e.g., 404 Not Found, 500 Server Error)
            throw new AppError("Failed to fetch Countries", response.status)
        }

        //Convert response body to JSON
        const data = await response.json();

        // Map the raw JSON array into an array of Country class instances
        return data.map((c: any) => new Country(c));

    } catch (error: any) {
        if (error instanceof AppError) {

            // Re-throw custom AppErrors as they are already specific
            throw error
        } else {

            // Wrap any other unexpected errors (e.g., network issues, JSON parsing errors) in a generic Error
            throw new Error("unexpected error:" + error)
        }
    }

}

/**
 * Fetches detailed data for a single country using its 3-letter ISO code (cca3).
 * @param code The 3-letter country code (e.g., "USA").
 * @returns A promise that resolves to a single Country object.
 * @throws AppError if the country is not found or other HTTP errors occur.
 */
export const fetchCountryByCode = async (code: string): Promise<Country> => {
    try {

        // Construct the API URL using the provided country code
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)


        console.log("HTTP Status:", response.status); //  to debug

        if (!response.ok) {

            // If status is 404 or similar, throw a specific AppError
            throw new AppError("Country not found", response.status)
        }

        const data = await response.json();
        console.log("Country Data:", data);

        //Validate response BEFORE passing to Country()
        if (!Array.isArray(data) || !data[0]) {
            throw new Error("Invalid country data received from API");
        }

        // Map the first element of the response array into a Country class instance
        return new Country(data[0]);

    } catch (error: any) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new Error("unexpected error:" + error)
        }

    }
}


/**
 * Fetches a list of countries belonging to a specific geographical region (e.g., "Europe", "Asia").
 * @param region The name of the region.
 * @returns A promise that resolves to an array of Country objects within that region.
 * @throws AppError if the region is not found or other HTTP errors occur.
 */
export const fetchCountryByRegion = async (region: string): Promise<Country[]> => {
    try {

        // Fetch countries filtered by region, selecting only necessary fields
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,cca3,population,region,capital,flags,borders`);
        console.log("HTTP Status:", response.status); //  to debug

        if (!response.ok) {

            // Throw a specific error if the region query fails
            throw new AppError("Region not found", response.status)
        }

        const data = await response.json();

        // Map the array of raw data objects into an array of Country class instancesrm -rf detailSection
        return data.map((c: any) => new Country(c));


    } catch (error: any) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new Error("unexpected error:" + error)
        }

    }
}