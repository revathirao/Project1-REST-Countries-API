
import { AppError } from "../utils/errorHandlers.js";
import { Country } from "../models/country.js";

export const fetchAllCountries = async (): Promise<Country[]> => {
    try {
        const response = await fetch
            ("https://restcountries.com/v3.1/all?fields=name,cca3,population,region,capital,flags,subregion,currencies,languages,borders")

        if (!response.ok) {
            throw new AppError("Failed to fetch Countries", response.status)
        }

        //Convert response body to JSON
        const data = await response.json();
        return data.map((c: any) => new Country(c));

    } catch (error: any) {
        if (error instanceof AppError) {
            throw error
        } else {
            throw new Error("unexpected error:" + error)
        }
    }

}

export const fetchCountryByCode = async (code: string): Promise<Country> => {
    try {

    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)

    // const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`);

        console.log("HTTP Status:", response.status); //  to debug

        if (!response.ok) {
            throw new AppError("Country not found", response.status)
        }

        const data = await response.json();
console.log("Country Data:", data);  
         //Validate response BEFORE passing to Country()
        if (!Array.isArray(data) || !data[0]) {
            throw new Error("Invalid country data received from API");
        }

        // console.log("API response for code:", code, data);
        return new Country(data[0]);

        
        // const c = data[0]; // the real country object

        // // FIX: API may return array OR object
        // const c = Array.isArray(data) ? data[0] : data;

        // if (!c) {
        //     throw new Error("Invalid country data received from API");
        // }

        // // Map into your Country model

        // // MAPPING: extract fields safely
        // const mappedCountry = new Country({
        //     name: c.name?.common ?? "N/A",
        //     nativeName: c.name?.official ?? "N/A",
        //     code: c.cca3 ?? code,
        //     flag: c.flags?.svg ?? "",
        //     population: c.population ?? 0,
        //     region: c.region ?? "N/A",
        //     subregion: c.subregion ?? "N/A",
        //     capital: c.capital?.[0] ?? "N/A",
        //     tld: c.tld ?? [],
        //     currencies: c.currencies
        //         ? Object.values(c.currencies).map((cu: any) => cu.name).join(", ")
        //         : "N/A",
        //     languages: c.languages
        //         ? Object.values(c.languages).join(", ")
        //         : "N/A",
        //     borders: c.borders ?? []
        // });

        // return mappedCountry;

    } catch (error: any) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new Error("unexpected error:" + error)
        }

    }
}

export const fetchCountryByRegion = async (region: string): Promise<Country[]> => {
    try {

        const response = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,cca3,population,region,capital,flags,borders`);


        console.log("HTTP Status:", response.status); //  to debug

        if (!response.ok) {
            throw new AppError("Region not found", response.status)
        }

        const data = await response.json();
        return data.map((c: any) => new Country(c));


    } catch (error: any) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new Error("unexpected error:" + error)
        }

    }
}