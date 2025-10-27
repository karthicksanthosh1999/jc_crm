import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFilterLead() {
  const mutation = useQuery({
    queryKey: ["lead-query"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/leads`);
      return data?.data;
    },
  });

  return mutation;
}
