import axios from 'axios';
import { history } from '../routers/AppRouter';
import { getToken } from '../helpers/auth';
import { toast } from 'react-toastify';
import { removeAllProducts } from '../helpers/cart';
import paths from '../helpers/paths';

const url = `${process.env.API_URL}/api/v1/sales`;

export const setAddCartModal = (state) => (
  {
    type: 'SET_ADD_CART_MODAL',
    cartAddModalState: state
  }
)

export const setCheckoutState = (state) => (
  {
    type: 'SET_CHECK_OUT_STATE',
    checkoutState: state
  }
)

export const setCheckoutError = (error) => (
  {
    type: 'SET_CHECK_OUT_ERROR',
    checkoutError: error
  }
)

export const checkoutProducts = (products, email) => dispatch => {
  dispatch(setCheckoutState('STATE_CHECKING_OUT'));
  const headers = {
    headers: { "Authorization": `Bearer ${getToken()}` }
  }
  const reqBody = {
    products
  }

  return axios.post(url, reqBody,
    headers
  )
    .then(({ data }) => {
      dispatch(setCheckoutState('STATE_CHECKOUT_SUCCESS'));
      toast.success('Successfully checked out', {
        hideProgressBar: true
      });
      removeAllProducts(email)
      history.push(`${paths.records}/${data.orderDetails.time_checked_out}`);
    })
    .catch(error => {

      dispatch(setCheckoutState('STATE_CHECKOUT_FAILED'));

      if (!error.response) {
        toast.error('Network Error', {
          hideProgressBar: true
        });
        dispatch(setCheckoutError('Network Error'));
      } else {
        toast.error(error.response.data.error, {
          hideProgressBar: true
        });
        dispatch(setCheckoutError(error.response.data.error));
      }
    });

}
