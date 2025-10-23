import { useMutation, useQueryClient } from "@tanstack/react-query";
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
        id: "course-create",
      });
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: () => {
      toast.error("Something went wrong...❌", { id: "course-create" });
    },
  });

  return mutation;
}

export function useFilterCourse() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (search: string) => {
      const { data } = await axios.get(`/api/courses?search=${search}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: () => {
      toast.error("Something went wrong...❌", { id: "course-filter" });
    },
  });

  return mutation;
}
