import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  config = {
    years: ["1830", "1850", "1878", "1900", "1928", "1955", "1980", "2005"]
  };

  constructor() { }

  getYears():string[] {
      return this.config.years;
  }
}
