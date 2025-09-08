import { apiService } from '../api/apiService';
import { CountriesResponse } from '../models/apiResponses';

class LookupService {
  constructor() {
    this.countries = null;
  }

  isCacheValid() {
    return !!this.countries;
  }

  async getCountries() {
    if (this.isCacheValid()) {
      return this.countries.data;
    }

    try {
      const response = await apiService.get('/lookups/countries');
      const countriesResponse = new CountriesResponse({
        success: true,
        data: response.data || response
      });
      
      if (countriesResponse.success) {
        this.countries = countriesResponse;
      } else {
        console.warn('Failed to load countries:', countriesResponse.message);
      }
      
      return this.countries.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return new CountriesResponse({
        success: false,
        message: error.message || 'Failed to fetch countries',
        errors: [error.message],
        errorCode: error.code
      });
    }
  }

  async getCountryNameById(countryId) {
    await this.getCountries();
    if (!this.countries || !this.countries.data) return null;

    const country = this.countries.data.find(c => c.id === countryId);
    return country ? country.name : null;
  }

  async getCityById(cityId) {
    await this.getCountries();
    if (!this.countries || !this.countries.data) return null;

    for (const country of this.countries.data) {
      const city = country.cities.find(c => c.id === cityId);
      if (city) return city;
    }
    return null;
  }

  async getCityNameById(cityId) {
    const city = await this.getCityById(cityId);
    return city ? city.name : null;
  }
  

  clearCache() {
    this.countries = null;
  }
}

const instance = new LookupService();
export { instance as default };