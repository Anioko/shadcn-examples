"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/client";

export type Entry = {
  id: string | number;
  title?: string;
  description?: string;
  status?: string;
  orderIndex?: number;
  metadata?: Record<string, unknown>;
  frameworkInstanceId?: string;
  grandchildId?: string;
  [key: string]: unknown;
}

// Get framework instance ID (you'll need to pass this or get it from context)
// For now, we'll create a helper to build the proper request
function getQueryKey(frameworkSlug: string, grandchildId: string) {
  return ["grandchildEntries", frameworkSlug, grandchildId] as const;
}

export function useGrandchildEntries(frameworkSlug: string, grandchildId: string, enabled = true) {
  const qk = getQueryKey(frameworkSlug, grandchildId);

  const query = useQuery({
    queryKey: qk,
    queryFn: async () => {
      // Note: This endpoint needs a framework instance ID
      // For now, fetch by grandchild to get all entries for this grandchild
      const url = `/grandchildren/${grandchildId}/entries`;
      const res = await api.get<{success: boolean; data: Entry[]}>(url);
      return res.data.data as Entry[];
    },
    enabled,
  });

  return query;
}

export function useCreateEntry(frameworkSlug: string, grandchildId: string) {
  const queryClient = useQueryClient();
  const qk = getQueryKey(frameworkSlug, grandchildId);

  return useMutation({
    mutationFn: async (payload: Partial<Entry>) => {
      // Ensure required fields are present
      const body = {
        ...payload,
        grandchildId: payload.grandchildId || grandchildId,
      };
      const res = await api.post<{success: boolean; data: Entry}>('/grandchild-entries', body);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk });
    }
  });
}

export function useUpdateEntry(frameworkSlug: string, grandchildId: string) {
  const queryClient = useQueryClient();
  const qk = getQueryKey(frameworkSlug, grandchildId);

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string | number; payload: Partial<Entry> }) => {
      const res = await api.put<{success: boolean; data: Entry}>(`/grandchild-entries/${id}`, payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk });
    }
  });
}

export function useDeleteEntry(frameworkSlug: string, grandchildId: string) {
  const queryClient = useQueryClient();
  const qk = getQueryKey(frameworkSlug, grandchildId);

  return useMutation({
    mutationFn: async (id: string | number) => {
      await api.delete(`/grandchild-entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk });
    }
  });
}

export function useReorderEntries(frameworkSlug: string, grandchildId: string) {
  const queryClient = useQueryClient();
  const qk = getQueryKey(frameworkSlug, grandchildId);

  return useMutation({
    mutationFn: async (orderedIds: Array<string | number>) => {
      const res = await api.post(`/grandchild-entries/reorder`, { frameworkSlug, grandchildId, orderedIds });
      return res.data;
    },
    onMutate: async (orderedIds: Array<string | number>) => {
      // optimistic: snapshot
      await queryClient.cancelQueries({ queryKey: qk });
      const previous = queryClient.getQueryData<Entry[]>(qk as unknown as readonly unknown[]);
      // reorder local cache if present
      if (previous) {
        const next = orderedIds.map((id: string | number) => previous.find((p: Entry) => String(p.id) === String(id))).filter(Boolean) as Entry[];
        queryClient.setQueryData(qk as unknown as readonly unknown[], next);
      }

      return { previous };
    },
    onError: (_err: unknown, _variables: unknown, context?: { previous?: Entry[] }) => {
      if (context?.previous) {
        queryClient.setQueryData(qk as unknown as readonly unknown[], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: qk });
    }
  });
}
