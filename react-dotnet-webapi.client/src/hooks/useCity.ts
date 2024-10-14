import { useEffect, useState } from "react";
import { City } from "../models/city.ts";
import ApiClient from "../services/api-client.ts";

const apiClient = new ApiClient<City>("/GetCityList");

const useCity = () => {
  const [data, setData] = useState<City[]>([]);

  useEffect(() => {
    apiClient.fetchData().then((res) => {
      setData(res);
    });
  }, []);

  return { data };
};

export default useCity;
