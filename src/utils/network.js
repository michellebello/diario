import axios from "axios";
import { clearToken, getTokenHeader } from "../contexts/Session.js";

const BASE_URL = "http://localhost:8080";

export default class Network {
  constructor() {
    this.client = axios.create({ baseURL: BASE_URL });
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          const url = error.config.url;
          const isAuthRoute =
            url.includes("/auth/login") ||
            url.includes("/auth/forgot-password") ||
            url.includes("auth/register") ||
            url.includes("/auth/new-password");
          if (!isAuthRoute) {
            console.warn("Unauthorized! Clearing session...");
            clearToken();
            window.location.href = "/";
          }
        }
        return Promise.reject(error);
      },
    );
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

  _getConfigs(externalConfigs) {
    return { headers: { ...getTokenHeader(), ...externalConfigs } };
  }

  get(url, additionalConfigs) {
    this._validateUrl(url);
    return this.client.get(url, this._getConfigs(additionalConfigs));
  }

  delete(url, additionalConfigs) {
    this._validateUrl(url);
    return this.client.delete(url, this._getConfigs(additionalConfigs));
  }

  post(url, body, additionalConfigs, isAuthenticated = true) {
    this._validateUrl(url);
    return this.client.post(url, body, this._getConfigs(additionalConfigs));
  }

  patch(url, data, additionalConfigs) {
    const config = this._getConfigs(additionalConfigs);
    this._validateUrl(url);
    return this.client.patch(url, data, config);
  }

  put(url, additionalConfigs) {
    this._validateUrl(url);
    return this.client.put(url, this._getConfigs(additionalConfigs));
  }
}

class InvalidURLError extends Error {}
