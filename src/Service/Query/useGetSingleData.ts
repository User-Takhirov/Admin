import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetSingleData = (id: any) => {
  return useQuery({
    queryKey: ["single-data", id],
    queryFn: () => request.get(`/category/${id}/`).then((res) => res.data),
  });
};
