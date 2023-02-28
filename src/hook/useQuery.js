import { useEffect } from "react";
import { useCallback, useState } from "react";
import client from "../sanity/config";

const useQuery = (query, options = {}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  const refetch = useCallback(async (options = {}, newQuery) => {
    setLoading(true);
    try {
      const data = await client.fetch(newQuery || query, options);
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (options.__fetch && options.__fetch === false) return;
    delete options.__fetch;
    refetch(options);
  }, []);

  return { data, loading, error, refetch };
};

export default useQuery;
