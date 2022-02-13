export const BASE_URL = 'http://mesto.allison.backend.nomoredomains.work';

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
    body: JSON.stringify(values)
  })
  .then(res => getResponseData(res))
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => getResponseData(res))
  .then(data => data)
}

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(`Упс, получилась ошибка: ${res.status}`);
  }
}