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

test('should set the login state', () => {
    const loginState = 'STATE_LOGGED_OUT';
    const action = {
        type: 'SET_LOGIN_STATE',
        loginState
    };
    const state = authReducer(undefined, action);
    expect(state.loginState).toEqual(loginState);

});

test('should set the login error message', () => {
    const loginError = 'Invalid username or password';
    const action = {
        type: 'SET_LOGIN_ERROR',
        loginError
    };
    const state = authReducer(undefined, action);
    expect(state.loginError).toEqual(loginError);

});
