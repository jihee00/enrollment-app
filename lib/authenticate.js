import { jwtDecode } from "jwt-decode";

export function readToken() {
  const token = getToken();
  return token ? jwtDecode(token) : null;
}

export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

function setToken(token) {
  localStorage.setItem("access_token", token);
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

  if (res.status === 201) {
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
