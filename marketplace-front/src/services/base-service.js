import axios from 'axios';

export const create = (opts) =>{
  const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
    ...opts,
  });

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if(
        opts.reloadOnUnhathorized &&
        error.response && [401, 403].includes(error.response.data.status)
      ) {
        console.log("Error 400");
      } else if (
        error.response &&
        [500].includes(error.response.data.staus)
      )
      {
        console.log("Error 500");
      }
      return Promise.reject(error?.response);
    }
  );

  return http;
}