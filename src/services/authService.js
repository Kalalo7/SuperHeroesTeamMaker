import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://challenge-react.alkemy.org', {
      email,
      password
    });
    return response.data.token;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};