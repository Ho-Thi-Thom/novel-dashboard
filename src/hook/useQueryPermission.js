import { useEffect } from "react";
import { useCallback, useState } from "react";
import client from "../sanity/config";

const useQuery = (query, options = {}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [params, setParams] = useState(options);

  useEffect(() => {
    setParams(options);
  }, [JSON.stringify(options)]);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await client.fetch(query, params);
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading };
};

export default useQuery;
