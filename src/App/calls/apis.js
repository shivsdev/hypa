import Axios from 'axios';

var url = 'https://cors-anywhere.herokuapp.com/http://34.253.224.180:18306/v1';
const apiUrl = Axios.create({
	baseURL: url,
});

const apiUrlWithToken = Axios.create({
	baseURL: url,
});

let token = window.sessionStorage.getItem('token');

apiUrl.interceptors.request.use(function (config) {
  config.headers.accept = 'application/json';
  return config;
})
apiUrlWithToken.interceptors.request.use(function (config) {
  config.headers.accept = 'application/json';
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export { apiUrl, apiUrlWithToken };