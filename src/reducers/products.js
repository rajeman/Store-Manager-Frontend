
const defaultState = {
    products: []
}

   

 export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
           const products = action.products;
            return {
                ...state, products
            }
        case 'SET_PRODUCT':
            return defaultState
        case 'DELETE_PRODUCT':
            return defaultState
        case 'UPDATE_PRODUCT':
            return defaultState
        case 'CREATE_PRODUCT':
            return defaultState
        default : 
            return defaultState
    }
};





