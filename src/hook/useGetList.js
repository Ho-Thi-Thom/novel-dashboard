import { useQuery } from "react-query";

function useGetList({ callDataApi }) {
  const getListQuery = useQuery("list-query", callDataApi, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: 0,
  });

  return getListQuery;
}

export default useGetList;
