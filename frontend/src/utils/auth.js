export const BASE_URL = 'http://localhost:3000';

export const register = (values) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  .then(res => getResponseData(res))
  .then((res) => {
    return res;
  })
};
export const authorize = (values) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(values)
  })
  .then(res => getResponseData(res))
};
export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getCurrentUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  .then(res => getResponseData(res))
  .then(data => data)
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(`${res.status}`);
  }
}