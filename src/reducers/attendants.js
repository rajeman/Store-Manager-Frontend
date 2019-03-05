const defaultState = {
  attendantCreateState: '',
  attendantCreateError: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ATTENDANT_STATE':
      return {
        ...state,
        attendantCreateState: action.state
      }
    case 'SET_ATTENDANT_ERROR':
      return {
        ...state,
        attendantCreateError: action.error
      }
    default:
      return state
  }
};





