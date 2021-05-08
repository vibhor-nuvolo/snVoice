/* eslint-disable class-methods-use-this */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const getAuthClient = (
  username,
  password,
  instanceURL,
  config,
) => {
  if (username === '' || password === '' || instanceURL === '') {
    throw new Error(
      'The auth information in your .env file is not complete. Please verify that it matches a valid sincronia .env file.',
    );
  }
  return axios.create({
    ...config,
    auth: {
      username,
      password,
    },
    baseURL: `https://${instanceURL}`,
  });
};

export const getDefaultAuthClient = () => {
  const username = process.env.REACT_APP_SN_USER ?? '';
  const password = process.env.REACT_APP_SN_PASSWORD ?? '';
  const instanceURL = process.env.REACT_APP_SN_INSTANCE ?? '';
  return getAuthClient(username, password, instanceURL);
};

class ClientWrapper {
   client;

  constructor() {
    this.client = null;
  }

  resolve() {
    return getDefaultAuthClient();
  }

  getClient() {
    if (!this.client) {
      this.client = this.resolve();
    }
    return this.client;
  }

  setClient(client) {
    this.client = client;
  }
}

const clientWrapper = new ClientWrapper();

const getClient = () => {
  return clientWrapper.getClient();
};

const getNewClient = () => {
  return clientWrapper.resolve();
};
export { getClient, getNewClient };
