import { createContext, useEffect, useState , useReducer} from 'react';

 const addCartItem  = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeItemFromItem = (cartItems, CartItemToRemove)=>{
//find the cart item to remove
const existingCartItem = cartItems.find(
  (cartItem) => cartItem.id === CartItemToRemove.id
);
//check the quantity if it is equal to one, remove the item from the cart
if(existingCartItem.quantity === 1){
    return cartItems.filter((cartItem) =>  cartItem.id !== CartItemToRemove.id )
}
//return back cartitems with matching cart item with reduced quantity
return cartItems.map((cartItem) =>
      cartItem.id === CartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };
  const clearCartItem = (cartItems, CartItemToClear) =>  cartItems.filter((cartItem) =>  cartItem.id !== CartItemToClear.id)
  
export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart:()=>{},
  cartCount : 0,
  cartTotal:0,
});

const INITIAL_STATE = {
  isCartOpen:false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const{ type, payload } = action;

  switch(type){
     case 'SET_CART_ITEMS':
    return {
        ...state,
        ...payload
      }
    default:
      throw new Error (`unhandled type of ${type} in cartReducer`)
  }
}
const AddToCartAction = (itemToAdd) => {
  dispatch({type : 'ADD_TO_CART', payload:itemToAdd})
}
   
export const CartProvider = ({ children }) => {

 
  const[{cartItems, isCartOpen,cartCount,cartTotal}, dispatch] = 
     useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem)=> total + cartItem.quantity,
      0 
      );
  const newCartTotal = newCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price ,
      0
    );
    dispatch({
      type: 'SET_CART_ITEMS' , 
      payload: { 
        cartItems: newCartItems , 
        cartTotal:newCartTotal, 
        cartCount:newCartCount 
      },
    });
  };


  const addItemToCart = (productToAdd) =>
{   
   const newCartItems = addCartItem(cartItems, productToAdd);
   updateCartItemsReducer(newCartItems);
};

const removeItemToCart = (CartItemToRemove) =>
{   
  const newCartItems= removeItem(cartItems, CartItemToRemove);
  updateCartItemsReducer(newCartItems)
}
const clearItemFromCart = (CartItemToClear) =>
{    
   const newCartItems = clearCartItem(cartItems, CartItemToClear);
   updateCartItemsReducer(newCartItems);
}    
  const value = { 
    isCartOpen, 
    setIsCartOpen:true,
    removeItemToCart,
    addItemToCart, 
    cartItems,
    cartCount,
    cartTotal,
    clearItemFromCart,
     };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};