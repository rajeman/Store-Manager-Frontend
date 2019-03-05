
export const setNavigation = navigation => (
  {
    type: 'SET_NAVIGATION',
    navigation,
  }
);

export const fetchUser = () => dispatch => axios.get(url, {
  headers: {
    Authorization: `Bearer ${attendantToken}`,
  },
})
  .then(({ data }) => (data.message !== undefined
    ? dispatch(setUser(data.userDetails))
    : dispatch(setUserError(data.error))))
  .catch(error => dispatch(setUserError(error)));
