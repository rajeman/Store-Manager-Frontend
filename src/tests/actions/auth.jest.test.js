import { setUser } from '../../actions/auth';
import { setUserError } from '../../actions/auth';
import { setLoginState } from '../../actions/auth';
import { setLoginError } from '../../actions/auth';

test('It should set a user details action', () => {
    const action = setUser({ id: 3, email: 'usermail@gmail.com' });
    expect(action).toEqual({
        type: "SET_USER",
        userDetails: {
            id: 3,
            email: 'usermail@gmail.com'
        }
    });
});

test('It should set user error', () => {
    const action = setUserError('user error');
    expect(action).toEqual({
        type: "SET_USER_ERROR",
        error: 'user error'
    });
});

test('it should set login state', () => {
    const action = setLoginState('STATE_LOGIN_FAILED');
    expect(action).toEqual({
        type: 'SET_LOGIN_STATE', 
        loginState: 'STATE_LOGIN_FAILED'
    })
})

test('it should set login error', () => {
    const action = setLoginError('Network error');
    expect(action).toEqual({
        type: 'SET_LOGIN_ERROR',
        loginError: 'Network error'
    });
});