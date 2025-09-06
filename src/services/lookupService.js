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

class CountryCityLookupService {
  /**
   * Get list of all countries with their cities
   * @returns {Promise<Array>} - Returns array of countries with their cities
   */
  async getCountriesWithCities() {
    try {
      const response = await apiService.get('/Lookups/Countries');
      if (response.success) {
        return {
          success: true,
          data: response.data,
          error: null
        };
      }
      return {
        success: false,
        data: null,
        error: response.message || 'Failed to fetch countries'
      };
    } catch (error) {
      console.error('Error fetching countries:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch countries. Please try again.'
      };
    }
  }

  /**
   * Get country name by ID
   * @param {string} countryId - The ID of the country
   * @param {Array} countries - The list of countries
   * @returns {string} - The name of the country or 'Unknown' if not found
   */
  getCountryNameById(countryId, countries = []) {
    if (!countryId || !Array.isArray(countries)) return 'Unknown';
    const country = countries.find(c => c.id === countryId);
    return country?.name || 'Unknown';
  }

  /**
   * Get city name by ID
   * @param {string} cityId - The ID of the city
   * @param {Array} countries - The list of countries
   * @returns {string} - The name of the city or 'Unknown' if not found
   */
  getCityNameById(cityId, countries = []) {
    if (!cityId || !Array.isArray(countries)) return 'Unknown';
    for (const country of countries) {
      const city = country.cities?.find(c => c.id === cityId);
      if (city) return city.name;
    }
    return 'Unknown';
  }

  /**
   * Get cities for a specific country
   * @param {string} countryId - The ID of the country
   * @param {Array} countries - The list of countries
   * @returns {Array} - Array of cities for the specified country
   */
  getCitiesByCountryId(countryId, countries = []) {
    if (!countryId || !Array.isArray(countries)) return [];
    const country = countries.find(c => c.id === countryId);
    return country?.cities || [];
  }
}

class NewCountryCityLookupService {
  async getCountriesWithCities() {
    try {
      const response = await apiService.get('/Lookups/Countries');
      if (response.success) {
        return {
          success: true,
          data: response.data,
          error: null
        };
      }
      return {
        success: false,
        data: null,
        error: response.message || 'Failed to fetch countries'
      };
    } catch (error) {
      console.error('Error fetching countries:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Failed to fetch countries. Please try again.'
      };
    }
  }

  getCountryNameById(countryId, countries = []) {
    if (!countryId || !Array.isArray(countries)) return 'Unknown';
    const country = countries.find(c => c.id === countryId);
    return country?.name || 'Unknown';
  }

  getCityNameById(cityId, countries = []) {
    if (!cityId || !Array.isArray(countries)) return 'Unknown';
    for (const country of countries) {
      const city = country.cities?.find(c => c.id === cityId);
      if (city) return city.name;
    }
    return 'Unknown';
  }

  getCitiesByCountryId(countryId, countries = []) {
    if (!countryId || !Array.isArray(countries)) return [];
    const country = countries.find(c => c.id === countryId);
    return country?.cities || [];
  }
}

export default {
  lookupService: new LookupService(),
  countryCityLookupService: new CountryCityLookupService(),
  newCountryCityLookupService: new NewCountryCityLookupService()
};
