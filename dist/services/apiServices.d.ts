import { Country } from "../models/country.js";
/**
 * Fetches data for all countries from the REST Countries API, maps the response data
 * into an array of `Country` objects, and returns them.
 * @returns A promise that resolves to an array of Country objects.
 * @throws AppError for specific HTTP errors or generic Error for unexpected issues.
 */
export declare const fetchAllCountries: () => Promise<Country[]>;
/**
 * Fetches detailed data for a single country using its 3-letter ISO code (cca3).
 * @param code The 3-letter country code (e.g., "USA").
 * @returns A promise that resolves to a single Country object.
 * @throws AppError if the country is not found or other HTTP errors occur.
 */
export declare const fetchCountryByCode: (code: string) => Promise<Country>;
/**
 * Fetches a list of countries belonging to a specific geographical region (e.g., "Europe", "Asia").
 * @param region The name of the region.
 * @returns A promise that resolves to an array of Country objects within that region.
 * @throws AppError if the region is not found or other HTTP errors occur.
 */
export declare const fetchCountryByRegion: (region: string) => Promise<Country[]>;
//# sourceMappingURL=apiServices.d.ts.map