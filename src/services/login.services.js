import app from '../utils/axiosConfig';

const baseUrl = "http://localhost:9090";

function login(email, password) {
    const requestOptions = {
        method:"POST",
        headers: {},
        data: {
            email,
            password
        }
    }

    return app.request(`${baseUrl}/users/login`, requestOptions);
}

export const loginService = {
    login
};