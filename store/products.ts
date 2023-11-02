import { defineStore } from 'pinia';
import { Product } from '~/interfaces/product';

const { customFetch } = customHttp();
const access_token = JSON.parse(localStorage.getItem('access_token') || '{}');

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    async getProducts() {
      try {
        const res: any = await customFetch('products', 'GET');
        this.products = res.value.products;
      } catch (error) {
        this.handleError(error, 'Failed to fetch products');
      }
    },

    async addProduct(productData: any) {
      try {
        const res: any = await customFetch('products', 'POST', { body: productData });
        this.products.push(res.value);
      } catch (error) {
        this.handleError(error, 'Failed to add product');
      }
    },

    async updateProduct(productId: number, productData: any) {
      try {
        await customFetch(`products/${productId}`, 'PUT', { body: productData }, access_token);
        const index = this.products.findIndex((product) => product.id === productId);
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...productData };
        }
      } catch (error) {
        this.handleError(error, 'Failed to update product');
      }
    },

    async deleteProduct(productId: number) {
      try {
        await customFetch(`products/${productId}`, 'DELETE');
        this.products = this.products.filter((product) => product.id !== productId);
      } catch (error) {
        this.handleError(error, 'Failed to delete product');
      }
    },

    handleError(error: any, message: string) {
      console.error(message, error.message);
    },
  },
  getters: {
    itemCount: (state) => {
      return state.products.length;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
