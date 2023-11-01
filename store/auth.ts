import { defineStore } from 'pinia';

interface AuthStoreState {
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    isAuthenticated: false,
  }),
  actions: {
    login(): void {
      this.isAuthenticated = true;
    },
    logout(): void {
      this.isAuthenticated = false;
      localStorage.clear();
      navigateTo('/');
    },
  },
  getters: {
    isLoggedIn: (state: AuthStoreState) => state.isAuthenticated,
  },
  persist: {
    storage: persistedState.localStorage,
  }
});
