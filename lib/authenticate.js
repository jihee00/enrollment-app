import { jwtDecode } from "jwt-decode";

export function readToken() {
    const token = getToken();
    return token ? jwtDecode(token) : null;
}

export function getToken() {
    try {
        return localStorage.getItem("access_token");
    } catch (err) {
        console.error("Error getting token from localStorage", err);
        return null;
    }
}

export function removeToken() {
    try {
        localStorage.removeItem("access_token");
    } catch (err) {
        console.error("Error removing token from localStorage", err);
    }
}

export function isAuthenticated() {
    const token = readToken();
    console.log('Decoded token:', token); // Debugging log
    if (!token) return false;

    const currentTime = Date.now() / 1000;
    if (token.exp < currentTime) {
        removeToken();
        return false;
    }

    return true;
}

function setToken(token) {
    try {
        console.log('Setting token:', token); // Debugging log
        localStorage.setItem("access_token", token);
    } catch (err) {
        console.error("Error setting token in localStorage", err);
    }
}

export async function authenticateUser(user, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ userName: user, password: password }),
        headers: {
            "content-type": "application/json",
        },
    });

    const data = await res.json();

    console.log('Login response:', data); // Debugging log

    if (res.status === 200) {
        setToken(data.token);
        return true;
    } else {
        throw new Error(data.message);
    }
}


export async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
        method: "POST",
        body: JSON.stringify({
            userName: user,
            password: password,
            password2: password2,
        }),
        headers: {
            "content-type": "application/json",
        },
    });

    const data = await res.json();
    if (res.status === 201) {
        return true;
    } else {
        throw new Error(data.message);
    }
}
