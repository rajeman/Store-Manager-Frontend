import { history } from '../routers/AppRouter';
import axios from 'axios';
import { getToken } from '../helpers/auth';
import paths from '../helpers/paths';

const url = `${process.env.API_URL}/api/v1/auth/signup`;

export const setAttendantError = (error) => (
  {
    type: 'SET_ATTENDANT_ERROR',
    error
  }
)

export const setCreateAttendant = (state) => (
  {
    type: 'SET_ATTENDANT_STATE',
    state
  }
)

export const createAttendant = (name, email) => dispatch => {
  dispatch(setCreateAttendant('STATE_CREATING'));
  dispatch(setAttendantError(''));
  const headers = {
    headers: { "Authorization": `Bearer ${getToken()}` }
  }
  const reqBody = {
    name, email
  }

  return axios.post(url, reqBody,
    headers
  )
    .then(() => {
      dispatch(setCreateAttendant('STATE_CREATE_SUCCESS'));
      history.push(paths.products);
    })
    .catch(error => {
      dispatch(setCreateAttendant('STATE_CREATE_FAILED'));
      if (!error.response) {
        dispatch(setAttendantError('Network Error'));
      } else {
        dispatch(setAttendantError(error.response.data.error));
      }
    });

}
