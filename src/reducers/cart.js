
const defaultState = {
  cartAddModalState: '',
  checkoutState: '',
  checkoutError: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ADD_CART_MODAL':
      return {
        ...state,
        cartAddModalState: action.cartAddModalState
      }
    case 'SET_CHECK_OUT_STATE':
      return {
        ...state,
        checkoutState: action.checkoutState
      }
    case 'SET_CHECK_OUT_ERROR':
      return {
        ...state,
        checkoutError: action.checkoutError
      }
    default:
      return state
  }
};





