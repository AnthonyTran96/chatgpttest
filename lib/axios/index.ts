import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
