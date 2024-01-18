import instance from "@/utils/instance";
import { useQuery } from "react-query";
import { useMemo } from "react";
import getAccessToken from "@/function/getAccessToken";

const getTopItem = async () =>
  (await instance.get(`user/music`, getAccessToken())).data;

const TOP_ITEM_QUERY_KEY = ["user", "music", "list"];

const useTopItem = () => {
  const getTopItemQuery = useQuery(TOP_ITEM_QUERY_KEY, () => getTopItem());

  const topItemList = useMemo(
    () => getTopItemQuery.data,
    [getTopItemQuery.data],
  );

  return {
    topItemList,
    getTopItemQueryIsLoading: getTopItemQuery.isLoading,
    getTopItemQueryIsSuccess: getTopItemQuery.isSuccess,
    getTopItemQueryRefetch: getTopItemQuery.refetch,
  };
};

export default useTopItem;
