import axios from "axios";
import { LOCAL_API, VERCEL_API } from "./constants";

const vercelAPI = LOCAL_API || VERCEL_API

export async function login (credentials) {
    try {
        return await axios.post(`${vercelAPI}/api/login`, { username: credentials.username, password: credentials.password });
    } catch (error) {
        console.error('ERROR LOGGING IN:', error);
    }
};

export async function fetchInvalidUsernames() {
    try {
        return await axios.get(vercelAPI.concat('/api/register'))
    } catch(error) {
        console.error(error)
    }
}

export async function signUp(inputs) {

    const { name, lastname, username, email, password1, password2 } = inputs;

    if (password1 !== password2 || password1.length > 5) return

    try {
        return await axios.post(`${vercelAPI}/api/register`, { name, lastname, username, email, password1 });
    } catch(error) {
        console.log(error)
    }
}