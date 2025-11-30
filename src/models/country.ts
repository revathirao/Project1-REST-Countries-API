//  Represents a country with various properties sourced from external API data.

export class Country {

  name: string;
  capital: string
  region: string
  population: number
  flags: string
  borders: string[]
  code: string
  currencies: string[];
  languages: string[];
  nativeName: string[];
  subregion: string;
  tld?: string[];


  constructor(data: any) {
    this.name = data.name?.common || "Unknown";
    this.capital = Array.isArray(data.capital) ? data.capital[0] : "N/A";
    this.region = data.region || "Unknown";
    this.population = data.population || 0;
    this.flags = data.flags?.png || "";  // Flag URL
    this.borders = data.borders || [];  // Border country codes
    this.code = data.cca3 || "";           // Country code
    this.subregion = data.subregion || "N/A";
    this.currencies = data.currencies
      ? Object.values(data.currencies).map((c: any) => c?.name || "N/A")
      : ["N/A"];

    // Convert the languages object into an array of language names/codes
    this.languages = data.languages
      ? Object.values(data.languages)
      : [];

    // Extract native common names from the nested structure
    this.nativeName = data.name?.nativeName
      ? Object.values(data.name.nativeName).map((n: any) => n?.common || "N/A")
      : ["N/A"];

    // Ensure tld is treated as an array
    this.tld = Array.isArray(data.tld) ? data.tld : data.tld ? [data.tld] : ["N/A"];
  }

  //Formats the population number with local-specific commas for readability.
  formattedPopulation(): string {
    return this.population.toLocaleString();
  }

  /* Generates a summary string of the country's primary details.
   returns A string summarizing key country information.*/

  displayDetails(): string {
    return `${this.name} (${this.code})- Capital: ${this.capital}, Region: ${this.region}, Population: ${this.formattedPopulation()}, 
        Flag: ${this.flags}, Borders: ${this.borders.join(",")}`;
  }
}
