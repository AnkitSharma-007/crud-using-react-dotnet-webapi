import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/employee",
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint?: string) {
    this.endpoint = endpoint ?? "";
  }

  fetchData = async () => {
    const res = await axiosInstance.get<T[]>(this.endpoint);
    return res.data;
  };

  fetchDataById = async (id: number | string) => {
    const res = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
    return res.data;
  };

  saveData = async (payload: T) => {
    const res = await axiosInstance.post(this.endpoint, payload);
    return res.data;
  };

  updateData = async (payload: T) => {
    const res = await axiosInstance.put(this.endpoint, payload);
    return res.data;
  };

  deleteData = async (id: number) => {
    const res = await axiosInstance.delete(`${this.endpoint}/${id}`);
    return res.data;
  };
}

export default ApiClient;
