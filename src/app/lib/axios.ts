import axios from 'axios';

const currencyApi = axios.create({
baseURL: 'https://api.currencybeacon.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.PRIVATE_CURRENCY_API_KEY}`,
  },
});

export default currencyApi;