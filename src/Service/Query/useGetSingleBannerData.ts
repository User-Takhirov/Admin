import { useQuery } from "@tanstack/react-query";
import { request } from "../../Config/request";

export const useGetSingleBannerData = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-banner", id],
    queryFn: () => request.get(`/banner/${id}/`).then((res) => res.data),
  });
};