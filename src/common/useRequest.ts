import { useState, useEffect } from 'react';
import axios from './api';
import { AxiosRequestConfig } from 'axios';

export default function useRequest(config: AxiosRequestConfig, req?: boolean) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (req || req === undefined) {
      setLoading(true);
      axios(config || {})
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [JSON.stringify(config), req]);

  return {
    error,
    data,
    loading,
  };
}
