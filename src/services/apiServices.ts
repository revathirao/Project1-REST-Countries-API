
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
        console.log("HTTP Status:", response.status); //  to debug

        if (!response.ok) {
            throw new AppError("Country not found", response.status)
        }

        const data = await response.json();
        return new Country(data[0]);
        console.log("API data:", data); // to debug

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

        console.log("API data:", data); // to debug

    } catch (error: any) {
        if (error instanceof AppError) {
            throw error;
        } else {
            throw new Error("unexpected error:" + error)
        }

    }
}