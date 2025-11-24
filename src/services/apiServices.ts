
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

export const fetchCountryByCode = async (code:string): Promise<Country> => {
    try {

        const response = await fetch("https://restcountries.com/v3.1/alpha/${code}")
        if(!response.ok){
            throw new AppError("Country not found",response.status)
        }

        const data = await response.json();
        return new Country(data[0]);
        
    } catch (error:any) {
        if(error instanceof AppError){
            throw error;
        }else{
            throw new Error("unexpected error:" + error)
        }
        
    }
}