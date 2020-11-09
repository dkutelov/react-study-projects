import React, { createContext, useState, useEffect } from "react"
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  getCartItemsCount,
  getCartItemsAmount
} from "./cart.utils.js"

const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
  cartItemsCount: 0,
  cartItemsAmount: 0
})

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [cartItemsAmount, setCartItemsAmount] = useState(0)

  const addItem = item => setCartItems(addItemToCart(cartItems, item))
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item))
  const clearItem = item => setCartItems(clearItemFromCart(cartItems, item))
  const toggleHidden = () => setHidden(!hidden)

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems))
    setCartItemsAmount(getCartItemsAmount(cartItems))
  }, [cartItems, cartItemsCount])
  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        removeItem,
        addItem,
        clearItem,
        cartItemsCount,
        cartItemsAmount
      }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider as default }
