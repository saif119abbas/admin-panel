/**
 * Base API Response Model
 * @template T
 */
class ApiResponse {
  /**
   * @param {Object} [response={}]
   * @param {boolean} [response.success=false] - Indicates if the request was successful
   * @param {T} [response.data=null] - The response data
   * @param {string} [response.message=''] - Optional message from the API
   * @param {string[]} [response.errors=[]] - List of error messages
   * @param {any} [response.errorCode=null] - Error code if any
   */
  constructor({
    success = false,
    data = null,
    message = '',
    errors = [],
    errorCode = null
  } = {}) {
    this.success = Boolean(success);
    this.message = message || '';
    this.data = data;
    this.errors = Array.isArray(errors) ? errors : [];
    this.errorCode = errorCode;
  }
}

/**
 * Country Model
 */
class Country {
  /**
   * @param {Object} data
   * @param {number|string} data.id - Country ID
   * @param {string} data.name - Country name
   * @param {string} data.code - Country code (ISO 3166-1 alpha-2)
   * @param {string} [data.flag] - Country flag emoji
   * @param {string} [data.dialCode] - Country dialing code
   */
  constructor({ id, name, code, flag, dialCode }) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.flag = flag || '';
    this.dialCode = dialCode || '';
  }
}

/**
 * Countries Response Model
 */
class CountriesResponse extends ApiResponse {
  /**
   * @param {Object} response
   * @param {boolean} response.success
   * @param {Array<Object>} [response.data=[]] - Array of country objects
   * @param {string} [response.message]
   * @param {string[]} [response.errors]
   * @param {any} [response.errorCode]
   */
  constructor({
    success = false,
    data = [],
    message = '',
    errors = [],
    errorCode = null
  } = {}) {
    super({ success, message, errors, errorCode });
    
    // Transform data to Country instances if we have data
    this.data = Array.isArray(data) 
      ? data.map(item => new Country(item)) 
      : [];
  }
}

export { ApiResponse, Country, CountriesResponse };
