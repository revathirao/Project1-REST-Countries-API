
export class Country {

    name: string;       
    capital:string
    region:string
    population: number
    flag :string
    borders: string
    code : number


  constructor(data:any) {
    this.name = data.name?.common|| "Unknown";           
    this.capital = data.capital;    
    this.region = data.region|| "Unknown";    
    this.population = data.population||0;
    this.flag = data.flags?.png || "";  // Flag URL
    this.borders = data.borders || [];  // Border country codes
    this.code = data.cca3 || "";           // Country code
  }

   formattedPopulation(): string {
    return this.population.toLocaleString();
  }

    displayDetails(): string {
        return `${this.name} (${this.code})- Capital: ${this.capital}, Region: ${this.region}, Population: ${this.formattedPopulation()}, 
        Flag: ${this.flag}, Borders: ${this.borders}`;
  }
}
