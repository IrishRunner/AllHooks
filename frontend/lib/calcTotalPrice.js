export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.vhook) return tally;
    return tally + cartItem.quantity * cartItem.vhook.price_bag;
  }, 0);
}
