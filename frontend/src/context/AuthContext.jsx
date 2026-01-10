import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axios';

const AuthContext = createContext({
    user: null,
    login: () => { },
    register: () => { },
    logout: () => { },
    errors: [],
    loading: false
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null); // Changed to null or object
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const { data } = await axiosClient.get('/api/me');
            setUser(data);
        } catch (e) {
            console.error('Failed to fetch user', e);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async ({ email, password }) => {
        setErrors(null);
        setLoading(true);
        try {
            const { data } = await axiosClient.post('/api/login', { email, password });
            localStorage.setItem('token', data.access_token);
            await getUser();
            return true; // Success
        } catch (e) {
            setLoading(false);
            if (e.response && e.response.status === 422) {
                setErrors(e.response.data.errors);
            } else {
                setErrors({ email: [e.response?.data?.message || 'Login failed'] });
            }
            throw e;
        }
    };

    const register = async (data) => {
        setErrors(null);
        setLoading(true);
        try {
            const response = await axiosClient.post('/api/register', data);
            localStorage.setItem('token', response.data.access_token);
            await getUser();
            return true;
        } catch (e) {
            setLoading(false);
            if (e.response && e.response.status === 422) {
                setErrors(e.response.data.errors);
            } else {
                setErrors({ email: [e.response?.data?.message || 'Registration failed'] });
            }
            throw e;
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await axiosClient.post('/api/logout');
            localStorage.removeItem('token');
            setUser(null);
        } catch (e) {
            console.error(e);
            localStorage.removeItem('token'); // Force logout on client anyway
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, errors, login, register, logout, loading, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
