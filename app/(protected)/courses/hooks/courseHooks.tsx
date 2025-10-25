import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useCreateCourse(handleClose: () => void) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post("/api/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Course created successfully...👍", {
        id: "course",
      });
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ["course-query", handleClose],
      });
    },
    onError: () => {
      toast.error("Something went wrong...❌", { id: "course" });
    },
  });

  return mutation;
}

export function useFilterCourse(search: string) {
  const mutation = useQuery({
    queryKey: ["course-query", search],
    queryFn: async () => {
      const { data } = await axios.get(`/api/courses?search=${search}`);
      return data?.data;
    },
  });

  return mutation;
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/courses/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-query"] });
      toast.success("Course delete successfully...🎉", { id: "course" });
    },
    onError: () => {
      toast.error("Something went wrong...❌", { id: "course" });
    },
  });
  return mutation;
}
