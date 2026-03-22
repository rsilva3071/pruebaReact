import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/favoritesSlice";
import type { Character } from "@/types/character";

interface FavoriteButtonProps {
  character: Character;
  size?: "sm" | "md";
  className?: string;
}

export function FavoriteButton({ character, size = "sm", className = "" }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isFav = useAppSelector((s) => s.favorites.items.some((c) => c.id === character.id));

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(character));
      }}
      aria-label={isFav ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`}
      className={`
        group/fav relative flex items-center justify-center rounded-full
        transition-all duration-200 ease-out active:scale-90
        ${size === "sm" ? "h-9 w-9" : "h-11 w-11"}
        ${isFav
          ? "bg-neon-pink/20 text-neon-pink"
          : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-neon-pink"
        }
        ${className}
      `}
    >
      <Heart
        className={`transition-transform duration-200 group-hover/fav:scale-110 ${size === "sm" ? "h-4 w-4" : "h-5 w-5"}`}
        fill={isFav ? "currentColor" : "none"}
        strokeWidth={2}
      />
    </button>
  );
}
