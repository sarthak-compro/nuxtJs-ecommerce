import { defineStore } from 'pinia';
import { Cart } from '~/interfaces/cart';
import { Product } from '~/interfaces/product';

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
    async addToCart(product: Product) {
      try {
        const requestData = {
          productId: product.id,
          name: product.name,
          quantity: 1,
          price: product.price
        };
        const res = await customFetch('cart', 'POST', { body: requestData }, access_token);
        this.cart = res.value as Cart;
      } catch (error) {
        this.handleError(error, 'Failed to add to cart');
      }
    },

    async increment (item: any) {
      const requestData = {
        productId: item.productId,
        name: item.name,
        quantity: 1,
        price: item.price
      };
      const res = await customFetch('cart', 'POST', { body: requestData }, access_token);
      this.cart = res.value as Cart;
    },
    
    async decrement (item: any) {
      const requestData = {
        productId: item.productId,
        name: item.name,
        quantity: -1,
        price: item.price
      };
      const res = await customFetch('cart', 'POST', { body: requestData }, access_token);
      this.cart = res.value as Cart;
    },

    async removeFromCart(item: any) {
      try {
        const res = await customFetch('cart/item', 'DELETE', { body: { productId: item.productId } }, access_token);
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
