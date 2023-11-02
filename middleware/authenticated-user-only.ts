import { useAuthStore } from '~/store/auth';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Check if the user is logged in
  if (authStore.isLoggedIn) {
    // You can add your access token validation logic here
    const accessToken = JSON.parse(localStorage.getItem('access_token') || '{}');
    // if (isAccessTokenValid(accessToken)) {
      // Access token is still valid, allow the route
      return true;
    // } else {
    //   // Access token is invalid or expired, log the user out and then redirect to the login page
    //   await authStore.logout();
    //   return navigateTo({
    //     path: '/',
    //     // query: { redirect: from.fullPath },
    //   });
    // }
  } else {
    // User is not logged in, redirect to the login page
    return navigateTo({
      path: '/',
      // query: { redirect: from.fullPath },
    });
  }
});

// Function to check if the access token is valid
function isAccessTokenValid(accessToken: any) {
  if (!accessToken) {
    return false;
  }

  // You can use your own logic to validate the access token here
  // For example, decode the token and check the "exp" claim as discussed earlier

  // const decodedToken = decodeAccessToken(accessToken) as JwtPayload;
  // if (decodedToken && decodedToken.exp) {
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   return decodedToken.exp >= currentTime;
  // }

  return false;
}

// Function to decode the access token (you can use your preferred JWT library)
function decodeAccessToken(accessToken: any) {
  try {
    // const decoded = await jwt.verify(accessToken, 'topsecret');
    // return decoded;
    return  ;
  } catch (error) {
    return null;
  }
}
