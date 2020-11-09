import { cartActionTypes as types } from "./cart.types"
import {
  addItemToCart,
  removeItemFromCart,
  reduceItemQuantity
} from "./cart.utils"
const INITIAL_STATE = {
  hidden: true,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }
    case types.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload)
      }
    case types.REDUCE_ITEM:
      return {
        ...state,
        cartItems: reduceItemQuantity(state.cartItems, payload)
      }
    case types.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload)
      }
    case types.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      }
    default:
      return state
  }
}

export { cartReducer as default }
