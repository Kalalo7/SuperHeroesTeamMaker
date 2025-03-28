import axios from 'axios';

const API_URL = 'https://www.superheroapi.com/api.php';
const ACCESS_TOKEN = '66c81fb1d22742448fae51db9331acb9';

export const searchHeroes = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/${ACCESS_TOKEN}/search/${name}`);
    return response.data.results || [];
  } catch (error) {
    console.error('Error searching heroes:', error);
    return [];
  }
};

export const getHeroById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${ACCESS_TOKEN}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting hero details:', error);
    throw error;
  }
};

export default {
  searchHeroes,
  getHeroById
};