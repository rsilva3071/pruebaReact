import { useQuery } from "@tanstack/react-query";
import type { Character } from "@/types/character";

async function fetchCharacter(id: number): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return res.json();
}

export function useCharacter(id: number) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
    staleTime: 1000 * 60 * 10,
    enabled: id > 0,
  });
}
