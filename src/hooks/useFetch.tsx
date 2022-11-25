import Fetch from '@utils/Fetch';
import { useState, useEffect } from 'react';

const useFetch = (endpoint: string) => {
  const [data, setData] = useState([]);

  async function fetchData() {
    const response = await Fetch.Get(endpoint);
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return data;
};

export default useFetch;
