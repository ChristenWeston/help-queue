import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const {  id, formattedWaitTime } = action;
  // const { names, location, issue, id, formattedWaitTime, timeOpen } = action;
  switch (action.type) {
  // case c.ADD_TICKET:
  //   // Object.assign clones the state object.
  //   //Object.assign takes three arguments. 1. empty object, 2. object that will be cloned 3. the change that should be made to our new copy
  //   return Object.assign({}, state, {
  //     [id]: {
  //       names: names,
  //       location: location,
  //       issue: issue,
  //       id: id,
  //       timeOpen: timeOpen,
  //       formattedWaitTime: formattedWaitTime
  //     }
  //   });
    
  case c.DELETE_TICKET:
    let newState = { ...state };
    delete newState[id];
    return newState;

    case c.UPDATE_TIME:
      const newTicket = Object.assign({}, state[id], {formattedWaitTime});
      const updatedState = Object.assign({}, state, {
        [id]: newTicket
      });
      return updatedState;
    default:
      return state;
  }
};
