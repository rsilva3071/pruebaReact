import { Link, useLocation } from "react-router-dom";
import { Heart, Zap, ChevronDown } from "lucide-react";
import { useAppSelector } from "@/store";
import { useState, useRef, useEffect } from "react";

export function Header() {
  const favCount = useAppSelector((s) => s.favorites.items.length);
  const favorites = useAppSelector((s) => s.favorites.items);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container max-w-6xl flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Home">
          <Zap className="h-5 w-5 text-primary transition-transform duration-200 group-hover:rotate-12 group-active:scale-90" />
          <span className="font-bold text-base tracking-tight text-foreground">
            Rick <span className="text-primary">&</span> Morty
          </span>
        </Link>

        {/* Favorites dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            aria-label={`Favorites (${favCount})`}
            aria-expanded={open}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
              border transition-all duration-200 active:scale-95
              ${open || location.pathname === "/favorites"
                ? "bg-neon-pink/15 text-neon-pink border-neon-pink/30"
                : "bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-neon-pink/20"
              }`}
          >
            <Heart className="h-3.5 w-3.5" fill={favCount > 0 ? "currentColor" : "none"} />
            <span>FAVS</span>
            <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-xl z-50 overflow-hidden animate-fade-in-up"
              style={{ animationDuration: "0.2s" }}
            >
              {favorites.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  No favorites yet
                </div>
              ) : (
                <ul className="max-h-64 overflow-y-auto divide-y divide-border">
                  {favorites.map((char) => (
                    <li key={char.id}>
                      <Link
                        to={`/character/${char.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <img src={char.image} alt={char.name} className="h-7 w-7 rounded-full object-cover" />
                        <span className="truncate font-medium">{char.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                to="/favorites"
                onClick={() => setOpen(false)}
                className="block border-t border-border px-4 py-2.5 text-xs text-primary hover:bg-secondary text-center font-medium transition-colors"
              >
                View all favorites
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
