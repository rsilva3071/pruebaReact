import { Link } from "react-router-dom";
import type { Character } from "@/types/character";
import { StatusBadge } from "./StatusBadge";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/favoritesSlice";

interface CharacterCardProps {
  character: Character;
  index?: number;
}

export function CharacterCard({ character, index = 0 }: CharacterCardProps) {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector((s) => s.favorites.items.some((c) => c.id === character.id));

  return (
    <div
      className="card-surface overflow-hidden animate-fade-in-up group"
      style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      <Link
        to={`/character/${character.id}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`View details for ${character.name}`}
      >
        {/* Name at top */}
        <div className="px-3 pt-3 pb-1.5">
          <h3 className="font-bold text-sm text-foreground truncate leading-tight uppercase tracking-wide">
            {character.name}
          </h3>
        </div>

        {/* Image */}
        <div className="relative mx-3 overflow-hidden rounded-md aspect-square">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <StatusBadge status={character.status} />
          </div>
        </div>
      </Link>

      {/* Like button at bottom */}
      <div className="px-3 py-2.5">
        <button
          onClick={() => dispatch(toggleFavorite(character))}
          aria-label={isFav ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`}
          className={`
            flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold
            transition-all duration-200 active:scale-95
            ${isFav
              ? "bg-neon-pink/20 text-neon-pink border border-neon-pink/30"
              : "bg-secondary text-muted-foreground border border-border hover:text-neon-pink hover:border-neon-pink/20"
            }
          `}
        >
          <Heart
            className="h-3.5 w-3.5"
            fill={isFav ? "currentColor" : "none"}
            strokeWidth={2}
          />
          Like
        </button>
      </div>
    </div>
  );
}
