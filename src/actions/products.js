import axios from 'axios';
import { history } from '../routers/AppRouter';
import { getToken } from '../helpers/auth';
import paths from '../helpers/paths';

const url = 'https://onlinestoremanager.herokuapp.com/api/v1/products';

export const setProductLoading = () => (
  {
    type: 'SET_PRODUCT_LOADING',
  }
);

export const setProductError = error => (
  {
    type: 'SET_PRODUCT_ERROR',
    error,
  }
);

export const setProduct = product => (
  {
    type: 'SET_PRODUCT',
    product,
  }
);
export const setDeleteModal = state => (
  {
    type: 'SET_DELETE_MODAL',
    deleteModal: state,
  }
);

export const setCreateProduct = state => (
  {
    type: 'PRODUCT_CREATE',
    productCreate: state,
  }
);

export const setCreateError = error => (
  {
    type: 'PRODUCT_CREATE_ERROR',
    productCreateError: error,
  }
);

export const setModifyProduct = state => (
  {
    type: 'PRODUCT_MODIFY',
    productModify: state,
  }
);

export const setModifyError = error => (
  {
    type: 'PRODUCT_MODIFY_ERROR',
    productModifyError: error,
  }
);

export const setProducts = products => (
  {
    type: 'SET_PRODUCTS',
    products,
  }
);


export const fetchProducts = () => dispatch => axios.get(url, {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})
  .then(({ data }) => (data.message !== undefined
    ? dispatch(setProducts(data.products))
    : dispatch(setProductError(data.error))))
  .catch(error => dispatch(setProductError(error)));

export const fetchProduct = id => dispatch => axios.get(`${url}/${id}`, {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})
  .then(({ data }) => (data.message !== undefined
    ? dispatch(setProduct(data.product))
    : dispatch(setProductError(data.error))))
  .catch(error => dispatch(setProductError(error)));

export const createProduct = (productName, productQuantity, price,
  minimumInventory) => (dispatch) => {
  dispatch(setCreateProduct('STATE_CREATING'));
  dispatch(setCreateError(''));
  const headers = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };
  const reqBody = {
    productName,
    productQuantity,
    price,
    minimumInventory,
  };

  return axios.post(url, reqBody,
    headers)
    .then(() => {
      dispatch(setCreateProduct('STATE_CREATE_SUCCESS'));

      history.push(paths.products);
    })
    .catch((error) => {
      // console.log(error);
      dispatch(setCreateProduct('STATE_CREATE_FAILED'));
      if (!error.response) {
        dispatch(setCreateError('Network Error'));
      } else {
        dispatch(setCreateError(error.response.data.error));
      }
    });
};

export const modifyProduct = (productName, productQuantity, price,
  minimumInventory, id) => (dispatch) => {
  dispatch(setModifyProduct('STATE_MODIFYING'));
  dispatch(setModifyError(''));
  const headers = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };
  const reqBody = {
    productName,
    productQuantity,
    price,
    minimumInventory,
  };

  return axios.put(`${url}/${id}`, reqBody,
    headers)
    .then(() => {
      dispatch(setModifyProduct('STATE_MODIFY_SUCCESS'));

      history.push(`${paths.products}/${id}`);
    })
    .catch((error) => {
      // console.log(error);
      dispatch(setModifyProduct('STATE_MODIFY_FAILED'));
      if (!error.response) {
        dispatch(setCreateError('Network Error'));
      } else {
        dispatch(setCreateError(error.response.data.error));
      }
    });
};


export const deleteProduct = id => () => {
  // dispatch(setModifyProduct('STATE_MODIFYING'));
  // dispatch(setModifyError(''));
  const headers = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };

  return axios.delete(`${url}/${id}`, headers)
    .then(() => {
      history.push(paths.products);
    })
    .catch((error) => {
      console.log(error);
      //  dispatch(setModifyProduct('STATE_MODIFY_FAILED'));
      if (!error.response) {
        // dispatch(setCreateError('Network Error'));
      } else {
        // dispatch(setCreateError(error.response.data.error));
        // console.log(error.response.data.error);
      }
    });
};
