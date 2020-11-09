import { createSelector } from "reselect"

// input selector
// returns slice of the state
const selectCart = state => state.cart

// output selector
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, item) => acc + item.quantity, 0)
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
)

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)
