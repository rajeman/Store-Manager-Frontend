import axios from 'axios';

const userUrl = 'https://onlinestoremanager.herokuapp.com/api/v1/user';
const loginUrl ='https://onlinestoremanager.herokuapp.com/api/v1/auth/login';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkplZmZlcnNvbiBQaXBlciIsImVtYWlsIjoianBpcGVyQGFkbWluLmNvbSIsInVzZXJJZCI6MSwibGV2ZWwiOjIsImlhdCI6MTU0NTc1OTQ5Mn0.yWdrR2DzWBCAgSEe9f8xSCAZY6RbxqssZADMSA9v33A';
const attendantToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1yIEF0dGVuZGFudCBHb2xkIiwiZW1haWwiOiJhdHRlbmRhbnRnb2xkQGdtYWlsLmNvbSIsInVzZXJJZCI6MywibGV2ZWwiOjEsImlhdCI6MTU0NTgzNDY1NH0.X6cAJauzTCD2VpD5ZUGFlVik1OaOGifrcAastwkXrb0'

/* export const fetchProducts = () => dispatch =>
    setTimeout(() => dispatch(setProducts(['speaker', 'amplifier', 'transmitter'])), 5000)
 */
export const fetchUser = () => dispatch =>
    axios.get(userUrl, {
        headers: {
            "Authorization": `Bearer ${attendantToken}`
        }
    })
        .then(({data}) => data.message != undefined ? dispatch(setUser(data.userDetails)) : dispatch(setUserError(data.error)))
        .catch(error => dispatch(setUserError(error)));


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

/* export const login = (email, password) => dispatch =>
    axios.post(loginUrl, {
       email,
       password
    })
        .then(({data}) => data.message != undefined ? dispatch(setLoginState('STATE_LOGGED_IN')) : dispatch(setUserError(data.error)))
        .catch(error => dispatch(setUserError(error)));
 */

export const login = (email, password) => dispatch => {
  dispatch(setLoginState('STATE_LOGGING_IN'));
  return axios.post(loginUrl, {
   email,
   password
})
    .then(({data}) => {
        //console.log(data);
        if(data.message){
            dispatch(setLoginError());   
            dispatch(setLoginState('STATE_LOGGED_IN'));
            
        } else{
            dispatch(setLoginState('STATE_LOGIN_FAILED'));
            dispatch(setLoginError('Network error'));   
        }   
    })
    .catch(error => {
        console.log(error);
        dispatch(setLoginError(error));   
        dispatch(setLoginState('STATE_LOGIN_FAILED'));
    });

}
 