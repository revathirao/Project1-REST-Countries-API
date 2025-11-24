
export class Country {

    name: string;       
    capital:string
    region:string
    population: number
    flag :string
    borders: string
    code : number


  constructor(data:any) {
    this.name = data.name;           
    this.capital = data.capital;    
    this.region = data.region;    
    this.population = data.population;
    this.flag = data.flags?.png || '';  // Flag URL
    this.borders = data.borders || [];  // Border country codes
    this.code = data.cca3;           // Country code
  }

   formattedPopulation(): string {
    return this.population.toLocaleString();
  }

    displayDetails(): string {
        return `${this.name}- Capital: ${this.capital}, Region: ${this.region}, Population: ${this.formattedPopulation()}`;
  }
}
