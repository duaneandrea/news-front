import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

export const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

export const register = async (name: string, email: string, password: string,password_confirmation:string) => {
    const response = await api.post('/register', { name, email, password,password_confirmation });
    return response.data;
};

export const logout = async () => {
    await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    localStorage.removeItem('token');
};


export default api;
