import { useEffect, useState } from "react";
import { Employee } from "../models/employee.ts";
import ApiClient from "../services/api-client.ts";

const apiClient = new ApiClient<Employee>();

const useEmployee = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient.fetchData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, isLoading };
};

export default useEmployee;
