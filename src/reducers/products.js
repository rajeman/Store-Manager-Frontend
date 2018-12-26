
const defaultState = [];


   

 export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.products;
        case 'SET_PRODUCT':
            return defaultState
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





