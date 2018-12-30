
const defaultState = {
    products: [],
    product: [], 
    deleteModal: '', 
    productCreate: ''
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
        case 'DELETE_PRODUCT':
            return defaultState
        case 'UPDATE_PRODUCT':
            return defaultState
        case 'CREATE_PRODUCT':
            return defaultState
        default : 
            return state
    }
};





