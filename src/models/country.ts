
export class Country {

  name: string;
  capital: string
  region: string
  population: number
  flag: string
  borders: string[]
  code: string
  // currencies: string[];
  // languages: string[];
  // nativeName::string[];
  // subregion:string;




  constructor(data: any) {
    this.name = data.name?.common || "Unknown";
    // this.capital = data.capital;  
    // capital array → string
    this.capital = Array.isArray(data.capital) ? data.capital[0] : "N/A";
    this.region = data.region || "Unknown";
    this.population = data.population || 0;
    this.flag = data.flags?.png || "";  // Flag URL
    this.borders = data.borders || [];  // Border country codes
    this.code = data.cca3 || "";           // Country code
  //   this.subregion = data.subregion || "N/A";
  //   // currencies -> convert object → list
  //   this.currencies = data.currencies
  //     ? Object.values(data.currencies).map((c: any) => c.name)
  //     : [];

  //   // languages -> convert object → list
  //   this.languages = data.languages
  //     ? Object.values(data.languages)
  //     : [];
  //   this.nativeName = data.nativeName?
  //   Object.values(data.nativeName):[];
  // 
  }

  formattedPopulation(): string {
    return this.population.toLocaleString();
  }

  displayDetails(): string {
    return `${this.name} (${this.code})- Capital: ${this.capital}, Region: ${this.region}, Population: ${this.formattedPopulation()}, 
        Flag: ${this.flag}, Borders: ${this.borders.join(",")}`;
  }
}
