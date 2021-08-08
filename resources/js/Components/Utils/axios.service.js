import axios from "axios";
export default class AxiosClass {

  get(url, header) {
      return this.responseHandler(axios.get(url, header));
  }

  post(url, body, header ) {
    return this.responseHandler(
      axios.post(url, body , header)
    );
  }

  put(url, body ) {
    return this.responseHandler(axios.put(url, body));
  }

  delete(url) {
    return this.responseHandler(axios.delete(url));
  }

  async responseHandler(responsePromise) {
    try {
      const response = await responsePromise;
      return response && response.data;
    } catch (error) {
      throw error;
    }
  }
}
export const AxiosService = new AxiosClass();
