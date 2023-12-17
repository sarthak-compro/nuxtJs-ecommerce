export default function customHttp() {
  const customFetch = async(url: string, method: any, options?: { headers?: any, body?: any, query?: any }, token?: any) => {
    // const baseUrl: string = 'http://localhost:3000/';
    const baseUrl: string = 'https://frozenkart-backend-c21e442c2596.herokuapp.com/';
    url = baseUrl + url;
  
    const headers = options?.headers || {};
    headers.Authorization = `Bearer ${token}`;

    const { data, error } = await useFetch(url, { 
      method,
      headers,
      query: options?.query,
      body: options?.body,
    });

    if (error.value) {
      throw createError({
        statusCode: error.value?.data?.status || 500,
        statusMessage: error.value?.data?.message || 'Encountered an error. Please refresh the page and try again.',
      });
    }

    return data;
  };

  return {
    customFetch
  };
}
