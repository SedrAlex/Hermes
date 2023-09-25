import { createContext , useEffect, useReducer} from "react";
import { 
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth } from "../Utils/fireBase/fireBase.utils";

export const UserContext = createContext({
   setCurrentUser : () => null,
   currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE = {
  currentUser: null,
};

 const userReducer = (state, action) => {
  console.log('dispatched');
  console.log(action)
  const{ type, payload } = action;

  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return{ ...state,currentUser: payload };
     
      default:
        throw new Error(`Unhandled type ${type} in userReducer`);
  }
};
 
export const UserProvider= ({ children }) => {
      //  const [ currentUser,setCurrentUser ] =useState(null);
      const[ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE)
      console.log(currentUser);
      const setCurrentUser = (user) => {
        dispatch({ type : USER_ACTION_TYPES.SET_CURRENT_USER, payload:user });
      }
      
      const value = { currentUser, setCurrentUser };
       
       useEffect(() => {
           const unsubscribe = onAuthStateChangedListener((user)=> {
          if(user) {
            createUserDocumentFromAuth(user);

          } 
            setCurrentUser(user);
           });
 
           return unsubscribe;
           
       }, []);
       
       return <UserContext.Provider value = {value}>
       {children}
       </UserContext.Provider>;
};
    
