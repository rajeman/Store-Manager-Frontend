
const defaultState = {
  sale: [],
  sales: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SALES':
      return {
        ...state,
        sales: action.sales
      };
    case 'SET_SALE':
      return {
        ...state,
        sale: action.sale
      };
    default:
      return state
  }
};





