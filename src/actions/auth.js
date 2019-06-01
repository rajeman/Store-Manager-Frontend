import { history } from '../routers/AppRouter';
import axios from 'axios';
import { setToken, getToken, deleteToken } from '../helpers/auth';
import paths from '../helpers/paths';

const userUrl = `${process.env.API_URL}/api/v1/user`;
const loginUrl = `${process.env.API_URL}/api/v1/auth/login`;

export const fetchUser = () => dispatch => {
  axios.get(userUrl, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  }).then(({ data }) => {
      if (data.message) {
        dispatch(setUser(data.userDetails))
        dispatch(setLoginState('STATE_LOGGED_IN'));
      }
    })
    .catch(error => {
      const { response } = error;
      if (response != undefined && response.status === 403 || response.status === 401) {
        dispatch(setLoginState('STATE_LOGGED_OUT'));
        deleteToken();
        history.push(paths.login)
      }
    });
}

export const setUser = (userDetails) => (
  {
    type: 'SET_USER',
    userDetails
  }
)

export const setUserError = (error) => (
  {
    type: 'SET_USER_ERROR',
    error
  }
)

export const setLoginState = (loginState) => (
  {
    type: 'SET_LOGIN_STATE',
    loginState
  }
)

export const setLoginError = (loginError) => (
  {
    type: 'SET_LOGIN_ERROR',
    loginError
  }
)

export const login = (email, password) => dispatch => {
  dispatch(setLoginState('STATE_LOGGING_IN'));
  return axios.post(loginUrl, {
    email,
    password
  })
    .then(({ data }) => {
      if (data.message) {
        setToken(data.token);
        dispatch(setLoginError());
        dispatch(setLoginState('STATE_LOGGED_IN'));
        history.push(paths.products);
      } else {
        dispatch(setLoginState('STATE_LOGIN_FAILED'));
        dispatch(setLoginError('Network error'));
      }
    })
    .catch(error => {
      dispatch(setLoginError(error.response.data.error));
      dispatch(setLoginState('STATE_LOGIN_FAILED'));
    });
}

export const logout = () => dispatch => {
  deleteToken();
  history.push(paths.login);
  dispatch(setLoginState('STATE_LOGGED_OUT'));
}
