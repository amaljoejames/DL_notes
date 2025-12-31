import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useUnits() {
  return useQuery({
    queryKey: [api.units.list.path],
    queryFn: async () => {
      const res = await fetch(api.units.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch units");
      return api.units.list.responses[200].parse(await res.json());
    },
  });
}

export function useUnit(id: number) {
  return useQuery({
    queryKey: [api.units.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.units.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch unit");
      return api.units.get.responses[200].parse(await res.json());
    },
  });
}
