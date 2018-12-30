import axios from 'axios';
import { getToken } from '../helpers/auth';

const url = 'https://onlinestoremanager.herokuapp.com/api/v1/products';

export const setProductLoading = () => (
    {
        type: 'SET_PRODUCT_LOADING'
    }
);

export const setProductError = (error) => (
    {
        type: 'SET_PRODUCT_ERROR',
        error
    }
);

/* export const fetchProducts = () => dispatch =>
    setTimeout(() => dispatch(setProducts(['speaker', 'amplifier', 'transmitter'])), 5000)
 */
export const fetchProducts = () => dispatch =>
    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    })
        .then(({ data }) => data.message != undefined ? dispatch(setProducts(data.products)) : dispatch(setProductError(data.error)))
        .catch(error => dispatch(setProductError(error)));

export const fetchProduct = (id) => dispatch =>
    axios.get(url + `/${id}`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    })
        .then(({ data }) => data.message != undefined ? dispatch(setProduct(data.product)) : dispatch(setProductError(data.error)))
        .catch(error => dispatch(setProductError(error)));

export const setProducts = (products) => (
    {
        type: 'SET_PRODUCTS',
        products
    }
)


export const setProduct = (product) => (
    {
        type: 'SET_PRODUCT',
        product
    }
)

export const setDeleteModal = (state) => (
    {
        type: 'SET_DELETE_MODAL',
        deleteModal: state
    }
)

export const setCreateProduct = (state) => (
    {
        type: 'PRODUCT_CREATE',
        productCreate: state
    }
)

export const updateProduct = (payload = {}) => (
    {
        type: 'UPDATE_PRODUCT',
        payload
    }
)

export const createProduct = (payload = {}) => (
    {
        type: 'CREATE_PRODUCT',
        payload
    }
)

