import { Routes, Route } from "react-router-dom";
import {  useEffect} from "react";
import Home from "./routes/home.component";
import Navigation from "./routes/Navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { setCurrentUser } from "./store/user/user.action";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./Utils/fireBase/fireBase.utils";
import { useDispatch } from "react-redux";// this is a library that give us the bindings to interact with react reedux

  const App =  () => {
    const dispatch = useDispatch();
   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user)=> {
     if(user) {
       createUserDocumentFromAuth(user);

     } 
       setCurrentUser(user);
       /*set current user is no longer dispatching it is just creating a user for us, but we need to dispatch it 
       so we should use the use dispatch hook*/
      });

      return unsubscribe;
      
  }, [dispatch]);// We know that the react redux only generates one dispatch for us and this dispatch will never change the reference, we don not need to pass thid dispatch as a reference, this useEffect only running when on initialization in order to set up the listener anyway, 
/**
 * we want to get the action creator, we don't want to locolaize this selector inside of App.js
 * we want potentially available to any one that wants to set current user
 
*/
   return (
    <Routes>
      <Route path='/' element = {<Navigation />}>
         <Route index element = {<Home />}/>
         <Route path='shop/*' element = {<Shop />}/>
         <Route path='auth' element = {<Authentication />}/>
         <Route path='checkout' element = {<Checkout />}/>

      </Route>
     </Routes>
   ) 
};

export default App;
/**
 * Rea
 */