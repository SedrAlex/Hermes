import { createAction } from "../../Utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => 
    createAction( USER_ACTION_TYPES.SET_CURRENT_USER, user );
// the value of payload is user
  //instead of just dispatching it is just want to create and return back an action object
  // the action object is created with the help of creator function
  // this is the function here 

  /**
   * In order for us deal with the boilerplatr code with the concepts of redux
   * we create: 
   * user action
   * user types
   * user selector
   * user reducer
   */