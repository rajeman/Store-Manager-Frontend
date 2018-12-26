
const defaultState = {};


 export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.userDetails       
        default : 
            return state
    }
};





