import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    return true;
  } else {
    return navigateTo({
      path: '/',
    //   query: { redirect: from.fullPath },
    });
  }
});
