import axios from "axios";

// store
import store from "../Store/index";

class NetworkClient {
  select(state) {
    // console.log('state', state);
    return state.auth.token;
  }

  listener() {
    token = store.getState()?.auth.token;
    console.log('store token listener====', token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  constructor() {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let service = axios.create({
      headers,
    });

    service.interceptors.response.use(this.handleSuccess, this.handleError);
    service.interceptors.request.use(async function (config) {
      let lang = store?.getState().app.appLang || 'en';
      let platform = store?.getState().app.platform;
      let token = null;
      if (store && store?.getState().auth.token) {
        token = store?.getState().auth.token
      } else {
        await import('js-cookie')
          .then((Cookies) => {
            token = Cookies.get('token')
          }).catch((error) => null
            // console.log("Cookies", error)
          );
      }
      config.headers.lang = lang
      if (token) {
        config.headers.Authorization = "Bearer " + token;
        // console.log('requst intercepter called',config.headers);
      }
      if (platform) {
        config.headers.platform = platform
      }
      // console.log("config", config.headers);
      return config;
    });
    this.service = service;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  getToken() {
    return "";
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(path, callback, headers) {
    return this.service
      .get(path, {
        headers: headers,
      })
      .then((response) => callback(response.status, response));
  }

  patch(path, payload, callback, headers) {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
        headers: headers,
      })
      .then((response) => callback(response.status, response.data));
  }

  post(path, payload, callback, headers, onUploadProgress) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
        headers: headers,
        onUploadProgress: onUploadProgress,
      })
      .then((response) => callback(response.status, response.data));
  }
  put(path, payload, callback, headers) {
    return this.service
      .request({
        method: "PUT",
        url: path,
        responseType: "json",
        data: payload,
        headers: headers,
      })
      .then((response) => callback(response.status, response.data));
  }
  delete(path, payload, callback, headers) {
    return this.service
      .request({
        method: "DELETE",
        url: path,
        responseType: "json",
        data: payload,
        headers: headers,
      })
      .then((response) => callback(response.status, response.data));
  }
  postAsFormData(path, payload, callback, headers) {
    return this.service
      .request({
        method: 'POST',
        url: path,
        data: payload,
        headers: headers,
      })
      .then((response) => callback(response.status, response.data));
  }
}

export default new NetworkClient();
