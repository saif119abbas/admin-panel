import { apiService } from '../api/apiService';
import { CountriesResponse } from '../models/apiResponses';

class LookupService {
  constructor() {
    this.countries = null;
    this.lastFetched = null;
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  }

  isCacheValid() {
    return this.countries && this.lastFetched && 
           (Date.now() - this.lastFetched) < this.CACHE_DURATION;
  }

  async getCountries() {
    if (this.isCacheValid()) {
      return this.countries.data;
    }

    try {
      const response = await apiService.get('/lookups/countries');
      const countriesResponse = new CountriesResponse({
        success: true,
        data: response.data || response // Handle both {data: [...]} and [...] response formats
      });
      
      if (countriesResponse.success) {
        this.countries = countriesResponse;
        this.lastFetched = Date.now();
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

  clearCache() {
    this.countries = null;
    this.lastFetched = null;
  }
}

export default new LookupService();
