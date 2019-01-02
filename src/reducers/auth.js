
const defaultState = {
    loginState: 'STATE_LOGGED_OUT',
    loginError: undefined,
    userDetails: {}
};


export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            const userDetails = action.userDetails !== undefined ? action.userDetails : state.userDetails;
            return {
                ...state,
                userDetails
            }
        case 'SET_LOGIN_STATE':
            const { loginState } = action;
            return {
                ...state,
                loginState
            }
        case 'SET_LOGIN_ERROR':
            const { loginError } = action;
            return {
                ...state,
                loginError
            }
        default:
            return state
    }
};





