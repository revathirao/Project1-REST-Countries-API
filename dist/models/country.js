//  Represents a country with various properties sourced from external API data.
export class Country {
    name;
    capital;
    region;
    population;
    flags;
    borders;
    code;
    currencies;
    languages;
    nativeName;
    subregion;
    tld;
    constructor(data) {
        this.name = data.name?.common || "Unknown";
        this.capital = Array.isArray(data.capital) ? data.capital[0] : "N/A";
        this.region = data.region || "Unknown";
        this.population = data.population || 0;
        this.flags = data.flags?.png || ""; // Flag URL
        this.borders = data.borders || []; // Border country codes
        this.code = data.cca3 || ""; // Country code
        this.subregion = data.subregion || "N/A";
        this.currencies = data.currencies
            ? Object.values(data.currencies).map((c) => c?.name || "N/A")
            : ["N/A"];
        // Convert the languages object into an array of language names/codes
        this.languages = data.languages
            ? Object.values(data.languages)
            : [];
        // Extract native common names from the nested structure
        this.nativeName = data.name?.nativeName
            ? Object.values(data.name.nativeName).map((n) => n?.common || "N/A")
            : ["N/A"];
        // Ensure tld is treated as an array
        this.tld = Array.isArray(data.tld) ? data.tld : data.tld ? [data.tld] : ["N/A"];
    }
    //Formats the population number with local-specific commas for readability.
    formattedPopulation() {
        return this.population.toLocaleString();
    }
    /* Generates a summary string of the country's primary details.
      returns A string summarizing key country information.*/
    displayDetails() {
        return `${this.name} (${this.code})- Capital: ${this.capital}, Region: ${this.region}, Population: ${this.formattedPopulation()}, 
      Flag: ${this.flags}, Borders: ${this.borders.join(",")}`;
    }
}
//# sourceMappingURL=country.js.map