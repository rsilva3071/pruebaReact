import { useParams, Link } from "react-router-dom";
import { useCharacter } from "@/hooks/useCharacter";
import { StatusBadge } from "@/components/StatusBadge";
import { Header } from "@/components/Header";
import { ArrowLeft, AlertTriangle, Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/favoritesSlice";

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: character, isLoading, isError } = useCharacter(Number(id) || 0);
  const dispatch = useAppDispatch();
  const isFav = useAppSelector((s) =>
    s.favorites.items.some((c) => c.id === Number(id))
  );

  return (
    <div className="min-h-screen space-bg">
      <Header />
      <main className="container max-w-2xl pb-16 pt-6 px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {isLoading && (
          <div className="card-surface p-6 space-y-4 animate-fade-in-up">
            <div className="aspect-square max-w-xs mx-auto rounded-lg animate-shimmer" />
            <div className="h-6 w-48 mx-auto rounded animate-shimmer" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 rounded animate-shimmer" />
              ))}
            </div>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-lg font-semibold mb-1">Character not found</h2>
            <p className="text-sm text-muted-foreground">This character doesn't exist in any dimension.</p>
          </div>
        )}

        {character && (
          <div className="card-surface overflow-hidden animate-fade-in-up">
            <div className="relative">
              <img
                src={character.image}
                alt={character.name}
                className="w-full max-h-80 object-cover"
              />
              <div className="absolute top-3 left-3">
                <StatusBadge status={character.status} />
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <h1 className="text-xl font-bold text-foreground leading-tight text-balance uppercase tracking-wide">
                  {character.name}
                </h1>
              </div>

              <div className="space-y-0 divide-y divide-border">
                {[
                  ["Species", character.species],
                  ["Type", character.type || "—"],
                  ["Gender", character.gender],
                  ["Origin", character.origin.name],
                  ["Location", character.location.name],
                  ["Episodes", `${character.episode.length} episode${character.episode.length !== 1 ? "s" : ""}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-foreground font-medium text-right max-w-[60%] truncate">{value}</span>
                  </div>
                ))}
              </div>

              {/* Like button */}
              <button
                onClick={() => dispatch(toggleFavorite(character))}
                aria-label={isFav ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`}
                className={`
                  flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-semibold
                  transition-all duration-200 active:scale-95
                  ${isFav
                    ? "bg-neon-pink/20 text-neon-pink border border-neon-pink/30"
                    : "bg-secondary text-muted-foreground border border-border hover:text-neon-pink hover:border-neon-pink/20"
                  }
                `}
              >
                <Heart className="h-4 w-4" fill={isFav ? "currentColor" : "none"} strokeWidth={2} />
                {isFav ? "Liked" : "Like"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
