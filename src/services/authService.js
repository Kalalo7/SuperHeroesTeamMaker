import axios from 'axios';

// La API de Alkemy parece no soportar HTTPS correctamente
const API_URL = 'http://challenge-react.alkemy.org/';

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, {
      email,
      password
    });
    return response.data.token;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};