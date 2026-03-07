import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, QuoteStatus, ServiceType } from "../backend";
import type { Photo, Quote, Review, SiteSettings } from "../backend.d";
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

export function useGetSiteSettings() {
  const { actor, isFetching } = useActor();
  return useQuery<SiteSettings>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor available");
      return actor.getSiteSettings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSiteSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: SiteSettings) => {
      if (!actor) throw new Error("No actor available");
      return actor.updateSiteSettings(settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteSettings"] });
    },
  });
}

export function useUpdateQuoteStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: bigint;
      status: QuoteStatus;
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.updateQuoteStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}

export function useGetPhotos() {
  const { actor, isFetching } = useActor();
  return useQuery<Photo[]>({
    queryKey: ["photos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPhotos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bytes,
      title,
      order,
    }: {
      bytes: Uint8Array<ArrayBuffer>;
      title: string;
      order: bigint;
      onProgress?: (pct: number) => void;
    }) => {
      if (!actor) throw new Error("No actor available");
      const blob = ExternalBlob.fromBytes(bytes);
      return actor.addPhoto(blob, title, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });
}

export function useAddPhotoWithProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bytes,
      title,
      order,
      onProgress,
    }: {
      bytes: Uint8Array<ArrayBuffer>;
      title: string;
      order: bigint;
      onProgress?: (pct: number) => void;
    }) => {
      if (!actor) throw new Error("No actor available");
      let blob = ExternalBlob.fromBytes(bytes);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      return actor.addPhoto(blob, title, order);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });
}

export function useDeletePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor available");
      return actor.deletePhoto(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });
}

export function useUpdatePhotoTitle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newTitle }: { id: bigint; newTitle: string }) => {
      if (!actor) throw new Error("No actor available");
      return actor.updatePhotoTitle(id, newTitle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
    },
  });
}

export function useGetReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      rating,
      message,
    }: {
      name: string;
      rating: bigint;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor available");
      return actor.submitReview(name, rating, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useDeleteReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor available");
      return actor.deleteReview(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export { ExternalBlob, QuoteStatus, ServiceType };
export type { Photo, Quote, Review, SiteSettings };
