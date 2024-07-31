import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
  console.log("Decoded token:", token); // Debugging log
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
    console.log("Setting token:", token); // Debugging log
    localStorage.setItem("access_token", token);
  } catch (err) {
    console.error("Error setting token in localStorage", err);
  }
}

export function getUserName() {
  const token = readToken();
  return token ? token.userName : null;
}

export async function authenticateUser(userName, password) {
  const res = await fetch("/api/students/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      password,
    }),
  });

  const data = await res.json();

  console.log("Login response:", data); // Debugging log

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export async function registerUser(userName, name, id, password, password2) {
  try {
    const response = await axios.post("/api/students/add", {
      userName,
      name: name,
      id,
      password,
      password2,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred during registration");
    }
  }
}
