import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>  
        <BrowserRouter>
             <CategoriesProvider>
               <CartProvider>
                 <App />
               </CartProvider>
             </CategoriesProvider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
/**
 * first thing we need to take care about is the part of reducer that amount first for that part is related to user
 * In our application we have to mount first the user because we need it in our entire application
 */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
