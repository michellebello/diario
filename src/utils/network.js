import axios from "axios";
import { getToken } from "../contexts/Session.js";

const BASE_URL = "http://localhost:8080";

export default class Network {
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers["CONTADOR_TOKEN"] = token;
        }
        config.headers["Content-Type"] = "application/json";
        config.headers["Accept"] = "application/json";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    return axios.get(this._buildUrl(url), config);
  }

  delete(url, config) {
    return axios.delete(this._buildUrl(url), config);
  }

  post(url, config) {
    return axios.post(this._buildUrl(url), config);
  }

  patch(url, config) {
    return axios.patch(this._buildUrl(url), config);
  }

  put(url, config) {
    return axios.put(this._buildUrl(url), config);
  }

  /**
   * Build the url with the base URL.
   *
   * @param {string} url The url suffix - should start with a /
   * @returns the fully formed url
   */
  _buildUrl(url) {
    this._validateUrl(url);
    return `${BASE_URL}${url}`;
  }

  /**
   * Validates that the url is properly formatted
   *
   * @param {string} url the url suffix - starts with / for example: "/v1/accounts"
   */
  _validateUrl(url) {
    if (!url.startsWith("/")) {
      throw new InvalidURLError("Improperly formatted url provided");
    }
  }
}

class InvalidURLError extends Error {}
