import axios, { AxiosError } from "axios";

export default function api<T>(url: string, data: { email: string; password: string }): Promise<T> {
  return axios
    .post(url, data)
    .then((request) => request.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
