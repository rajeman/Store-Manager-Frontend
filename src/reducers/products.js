
const defaultState = {
  products: [],
  product: [],
  deleteModal: '',
  productCreate: '',
  productCreateError: '',
  productModify: '',
  productModifyError: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.products
      }
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.product
      }
    case 'SET_DELETE_MODAL':
      return {
        ...state,
        deleteModal: action.deleteModal
      }
    case 'PRODUCT_CREATE':
      return {
        ...state,
        productCreate: action.productCreate
      }
    case 'PRODUCT_MODIFY':
      return {
        ...state,
        productModify: action.productModify
      }
    case 'PRODUCT_CREATE_ERROR':
      return {
        ...state,
        productCreateError: action.productCreateError
      }
    case 'PRODUCT_MODIFY_ERROR':
      return {
        ...state,
        productModifyError: action.productModifyError
      }
    default:
      return state
  }
};





