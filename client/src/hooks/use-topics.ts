import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useTopic(id: number) {
  return useQuery({
    queryKey: [api.topics.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.topics.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch topic");
      return api.topics.get.responses[200].parse(await res.json());
    },
  });
}
