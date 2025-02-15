import axios from "axios";
import { getTokenHeader } from "../contexts/Session.js";

const BASE_URL = "http://localhost:8080";

export default class Network {
  get(url, additionalConfigs) {
    return axios.get(this._buildUrl(url), this._getConfigs(additionalConfigs));
  }

  delete(url, additionalConfigs) {
    return axios.delete(
      this._buildUrl(url),
      this._getConfigs(additionalConfigs)
    );
  }

  post(url, body, additionalConfigs, isAuthenticated = true) {
    return isAuthenticated
      ? axios.post(
          this._buildUrl(url),
          body,
          this._getConfigs(additionalConfigs)
        )
      : axios.post(this._buildUrl(url), body, additionalConfigs);
  }

  patch(url, additionalConfigs) {
    return axios.patch(
      this._buildUrl(url),
      this._getConfigs(additionalConfigs)
    );
  }

  put(url, additionalConfigs) {
    return axios.put(this._buildUrl(url), this._getConfigs(additionalConfigs));
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

  _getConfigs(externalConfigs) {
    return { headers: { ...getTokenHeader(), ...externalConfigs } };
  }
}

class InvalidURLError extends Error {}
