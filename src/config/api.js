// API Configuration
const API_CONFIG = {
  baseUrl: 'https://superheroapi.com/api',
  token: process.env.REACT_APP_API_TOKEN || '',
  getUrl: function(endpoint) {
    return `${this.baseUrl}/${this.token}/${endpoint}`;
  }
};

export default API_CONFIG;