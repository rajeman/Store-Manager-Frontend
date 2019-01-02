import authReducer from '../../reducers/auth';

test('should setup default auth value', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        loginState: 'STATE_LOGGED_OUT',
        loginError: undefined,
        userDetails: {}
    });
});

test('should set the details of a user', () => {
    const state = authReducer(undefined, { type: 'SET_USER' });
    expect(state.userDetails).toEqual({});
});

/* test('should change the login state', () => {
    const currentState = {
        loginState: 'STATE_LOGGED_IN',
        loginError: undefined,
        userDetails: {}
    };
    const state = authReducer(currentState, { type: 'SET_LOGIN_STATE'});

}); */