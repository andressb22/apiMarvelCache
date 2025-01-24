/* eslint-disable prettier/prettier */
import {create, ApiResponse} from 'apisauce';
import {AxiosRequestConfig} from 'axios';

interface LoginResponse {
  name: string;
  surname: string;
}

const api = create({
  baseURL: 'https://mocked-api.com', // Este URL no se utilizará realmente
  headers: {Accept: 'application/json'},
});

api.addResponseTransform(response => {
  // Comprobamos si es una solicitud de login
  const {url, method, data}: AxiosRequestConfig = response.config ?? {};
  if (url === '/login' && method === 'post') {
    const {email, password} = JSON.parse(data);

    if (email === 'asierra447@gmail.com' && password === '12345Af') {
      response.data = {name: 'Andres', lastName: 'Sierra', email};
      response.ok = true;
    } else {
      response.data = {message: 'Credenciales incorrectas'};
      response.ok = false;
    }
  }
});

// Crear una función para manejar el login
export const login = async (
  email: string,
  password: string,
): Promise<ApiResponse<LoginResponse | {message: string}>> => {
  return api.post('/login', {email, password});
};
