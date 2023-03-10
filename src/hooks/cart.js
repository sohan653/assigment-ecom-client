import React, {useState, useEffect, createContext, useContext} from 'react';
import {toast} from "react-toastify";

const CartContext=createContext()

 const CartProvider = ({ children }) => {
     const [cartItems, setCartItems] = useState([]);

     useEffect(() => {
         const data = localStorage.getItem('cartItems');
         if (data && JSON.parse(data).length > 0) {
             setCartItems(JSON.parse(data));
         }
     }, []);

     useEffect(() => {
         localStorage.setItem('cartItems', JSON.stringify(cartItems));
     }, [cartItems]);

     const addToCart = (item) => {
         const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
         if (itemIndex === -1) {
             // Item not in cart, add new item
             setCartItems([...cartItems, { ...item, cartQuantity: 1 }]);
         } else {
             // Item already in cart, increase quantity
             const newCartItems = [...cartItems];
             newCartItems[itemIndex].cartQuantity += 1;
             setCartItems(newCartItems);
         }
     };

     const removeFromCart = (id) => {
         const newCartItems = cartItems.filter((cartItem) => cartItem._id !== id);
         setCartItems(newCartItems);
     };

     const clearCart = () => {
         setCartItems([]);
     };
     const getAllItems = () => {
         return cartItems;
     };

     const increaseQuantity = (item) => {
         const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

        if(itemIndex>=0){

            const newCartItems = [...cartItems];
            newCartItems[itemIndex].cartQuantity += 1;
            setCartItems(newCartItems);
        }
     };

     const decreaseQuantity = (item) => {
         const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
         const newCartItems = [...cartItems];
         if (newCartItems[itemIndex].cartQuantity > 1) {
             newCartItems[itemIndex].cartQuantity -= 1;
         }
         setCartItems(newCartItems);
     };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart,getAllItems,increaseQuantity ,decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart= () => useContext(CartContext);
export{useCart,CartProvider};