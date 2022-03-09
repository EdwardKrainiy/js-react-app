import axios, { AxiosError } from "axios";

export default function api<T>(url: string): Promise<T> {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      throw err;
    });
}
