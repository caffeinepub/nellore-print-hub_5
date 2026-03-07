import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceType } from "../backend";
import type { Quote } from "../backend.d";
import { useActor } from "./useActor";

export function useGetQuotes() {
  const { actor, isFetching } = useActor();
  return useQuery<Quote[]>({
    queryKey: ["quotes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      mobile,
      service,
      details,
    }: {
      name: string;
      mobile: string;
      service: ServiceType;
      details: string;
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.submitQuote(name, mobile, service, details);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}

export { ServiceType };
export type { Quote };
