
const defaultState = {
  urlPath: '',
  id: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_NAVIGATION':
      return {
        ...state,
        ...action.navigation
      }
    default:
      return state
  }
};





