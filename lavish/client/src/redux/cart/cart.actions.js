import { cartActionTypes as types } from "./cart.types"

export const toggleCartHidden = () => ({
  type: types.TOGGLE_CART_HIDDEN
})

export const addItem = item => ({
  type: types.ADD_ITEM,
  payload: item
})

export const removeItem = itemId => ({
  type: types.REMOVE_ITEM_FROM_CART,
  payload: itemId
})

export const reduceItem = item => ({
  type: types.REDUCE_ITEM,
  payload: item
})

export const clearCart = () => ({
  type: types.CLEAR_CART
})
