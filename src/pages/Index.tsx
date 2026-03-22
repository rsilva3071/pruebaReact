import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import { useDebounce } from "@/hooks/useDebounce";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterCardSkeleton } from "@/components/CharacterCardSkeleton";
import { SearchBar } from "@/components/SearchBar";
import { StatusFilter } from "@/components/StatusFilter";
import { PaginationControls } from "@/components/PaginationControls";
import { Header } from "@/components/Header";
import { AlertTriangle, SearchX } from "lucide-react";

export default function Index() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useCharacters({
    name: debouncedSearch || undefined,
    status: status as any || undefined,
    page,
  });

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatus = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  return (
    <div className="min-h-screen space-bg">
      <Header />
      <main className="container max-w-6xl pb-16 pt-6 space-y-6">
        {/* Filters */}
        <div className="space-y-3 animate-fade-in-up">
          <SearchBar value={search} onChange={handleSearch} />
          <StatusFilter value={status} onChange={handleStatus} />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CharacterCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-1">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">Couldn't fetch characters. Try again later.</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && data?.results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
            <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-1">No characters found</h2>
            <p className="text-sm text-muted-foreground">Try a different search or filter.</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && data && data.results.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.results.map((char, i) => (
                <CharacterCard key={char.id} character={char} index={i} />
              ))}
            </div>
            <PaginationControls
              page={page}
              totalPages={data.info.pages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
