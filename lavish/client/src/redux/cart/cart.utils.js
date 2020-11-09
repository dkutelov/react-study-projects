export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, itemId) =>
  cartItems.filter(cartItem => cartItem.id !== itemId)

export const reduceItemQuantity = (cartItems, item) => {
  const { quantity } = cartItems.find(cartItem => cartItem.id === item.id)

  if (quantity > 1) {
    return cartItems.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
  }
  return cartItems.filter(cartItem => cartItem.id !== item.id)
}
