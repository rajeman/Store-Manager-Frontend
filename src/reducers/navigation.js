
const defaultState = {};


export default (state = defaultState, action) => {
   switch (action.type) {
       case 'SET_NAVIGATION':
           return action.navigation !== undefined ? action.navigation : state;      
       default : 
           return state
   }
};





