export class Country {
    name;
    capital;
    region;
    population;
    flag;
    borders;
    code;
    constructor(data) {
        this.name = data.name?.common || "Unknown";
        this.capital = data.capital;
        this.region = data.region || "Unknown";
        this.population = data.population || 0;
        this.flag = data.flags?.png || ""; // Flag URL
        this.borders = data.borders || []; // Border country codes
        this.code = data.cca3 || ""; // Country code
    }
    formattedPopulation() {
        return this.population.toLocaleString();
    }
    displayDetails() {
        return `${this.name} (${this.code})- Capital: ${this.capital}, Region: ${this.region}, Population: ${this.formattedPopulation()}, 
        Flag: ${this.flag}, Borders: ${this.borders}`;
    }
}
//# sourceMappingURL=country.js.map