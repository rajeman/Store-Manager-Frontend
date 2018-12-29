import axios from 'axios';
import { getToken } from '../helpers/auth';

const url = 'https://onlinestoremanager.herokuapp.com/api/v1/sales';

export const setSaleLoading = () => (
    {
        type: 'SET_SALE_LOADING'
    }
);

export const setSaleError = (error) => (
    {
        type: 'SET_SALE_ERROR',
        error
    }
);

/* export const fetchProducts = () => dispatch =>
    setTimeout(() => dispatch(setProducts(['speaker', 'amplifier', 'transmitter'])), 5000)
 */
export const fetchSales = () => dispatch =>
    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    })
        .then(({data}) => data.message != undefined ? dispatch(setSales(data.orders)) : dispatch(setSaleError(data.error)))
        .catch(error => dispatch(setSaleError(error)));


export const setSales = (sales) => (
    {
        type: 'SET_SALES',
        sales
    }
)


export const setSale = (id) => (
    {
        type: 'SET_SALE',
        saleId: id
    }
)


