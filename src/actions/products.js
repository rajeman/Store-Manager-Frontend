import axios from 'axios';

const url = 'https://onlinestoremanager.herokuapp.com/api/v1/products';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkplZmZlcnNvbiBQaXBlciIsImVtYWlsIjoianBpcGVyQGFkbWluLmNvbSIsInVzZXJJZCI6MSwibGV2ZWwiOjIsImlhdCI6MTU0NTc1OTQ5Mn0.yWdrR2DzWBCAgSEe9f8xSCAZY6RbxqssZADMSA9v33A';

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
            "Authorization": `Bearer ${token}`
        }
    })
        .then(({data}) => data.message != undefined ? dispatch(setProducts(data.products)) : dispatch(setProductError(data.error)))
        .catch(error => dispatch(setProductError(error)));


export const setProducts = (products) => (
    {
        type: 'SET_PRODUCTS',
        products
    }
)


export const setProduct = (id) => (
    {
        type: 'SET_PRODUCT',
        productId: id
    }
)

export const deleteProduct = (id) => (
    {
        type: 'DELETE_PRODUCT',
        productId: id
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

export default () => {
    axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(function (response) {
            //console.log(response.data.products);
        })
        .catch(function (error) {
            // console.log(error);
        });

};
