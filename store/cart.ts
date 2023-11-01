import { defineStore } from 'pinia';
import { Cart } from '~/interfaces/cart';

interface CartStoreState {
  cart: Cart | null;
}

const { customFetch } = customHttp();
const access_token = JSON.parse(localStorage.getItem('access_token') || '{}');

export const useCartStore:any = defineStore('cartStore', {
  state: (): CartStoreState => ({
    cart: null,
  }),
  actions: {
    async addToCart(product: any) {
      try {
        const requestData = {
          productId: product.id,
          name: product.name,
          quantity: product.quantity ?? 1,
          price: product.price
        };
        const res = await customFetch('cart', 'POST', { body: requestData }, access_token);
        this.cart = res.value as Cart;
      } catch (error) {
        this.handleError(error, 'Failed to add to cart');
      }
    },

    async removeFromCart(product: any) {
      try {
        const res = await customFetch('cart/item', 'DELETE', { body: { productId: product.id } }, access_token);
        this.cart = res.value as Cart;
        if (!this.cart?.items?.length) this.cart = null;
      } catch (error) {
        this.handleError(error, 'Failed to remove from cart');
      }
    },

    async getCart() {
      try {
        const res = await customFetch('cart', 'GET', {}, access_token);
        this.cart = res.value as Cart;
      } catch (error) {
        this.handleError(error, 'Failed to fetch cart');
      }
    },

    async deleteCart() {
      try {
        await customFetch('cart', 'DELETE', {}, access_token);
        this.cart = null;
      } catch (error) {
        this.handleError(error, 'Failed to delete the cart');
      }
    },

    handleError(error: any, message: string) {
      console.error(message, error.message);
    },
  },
  getters: {
    cartState: (state: CartStoreState) => state.cart,
    itemCount: (state: CartStoreState) => {
      const cart = useCartStore().cartState;
      return cart ? cart.items.length : 0;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  }
});
