import axios from 'axios';

let baseURL;
if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://myapp.com/api/';
} else {
    baseURL = 'http://localhost:8000/api/';
}

const iaxios = axios.create({
    baseURL
});

export default iaxios;