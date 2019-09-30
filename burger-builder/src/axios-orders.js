import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-779dc.firebaseio.com'
});

export default instance;