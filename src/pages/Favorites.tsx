import { Header } from "@/components/Header";
import { CharacterCard } from "@/components/CharacterCard";
import { useAppSelector } from "@/store";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const favorites = useAppSelector((s) => s.favorites.items);

  return (
    <div className="min-h-screen space-bg">
      <Header />
      <main className="container max-w-6xl pb-16 pt-6 space-y-6">
        <h1 className="text-xl font-bold text-foreground animate-fade-in-up">Favoritos</h1>

        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-1">No favorites yet</h2>
            <p className="text-sm text-muted-foreground mb-4">Tap the heart on any character to save them here.</p>
            <Link
              to="/"
              className="text-sm text-primary hover:underline underline-offset-4 active:scale-95 transition-transform"
            >
              Browse characters
            </Link>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((char, i) => (
              <CharacterCard key={char.id} character={char} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
