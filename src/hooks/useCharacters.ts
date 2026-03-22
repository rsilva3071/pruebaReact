import { useQuery } from "@tanstack/react-query";
import type { CharacterResponse, CharacterFilters } from "@/types/character";

const BASE_URL = "https://rickandmortyapi.com/api/character";

async function fetchCharacters(filters: CharacterFilters): Promise<CharacterResponse> {
  const params = new URLSearchParams();
  if (filters.name) params.set("name", filters.name);
  if (filters.status) params.set("status", filters.status);
  if (filters.page) params.set("page", String(filters.page));

  const res = await fetch(`${BASE_URL}?${params}`);
  if (res.status === 404) {
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
  if (!res.ok) throw new Error("Failed to fetch characters");
  return res.json();
}

export function useCharacters(filters: CharacterFilters) {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => fetchCharacters(filters),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
}
