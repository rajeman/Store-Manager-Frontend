
const defaultState = [];


   

export default (state = defaultState, action) => {
   switch (action.type) {
       case 'SET_SALES':
           return action.sales;
       default : 
           return state
   }
};





