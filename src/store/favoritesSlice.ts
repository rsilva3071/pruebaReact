import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Character } from "@/types/character";

interface FavoritesState {
  items: Character[];
}

const loadFavorites = (): Character[] => {
  try {
    const stored = localStorage.getItem("rm-favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (items: Character[]) => {
  localStorage.setItem("rm-favorites", JSON.stringify(items));
};

const initialState: FavoritesState = { items: loadFavorites() };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Character>) {
      const exists = state.items.find((c) => c.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((c) => c.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveFavorites(state.items);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
      saveFavorites(state.items);
    },
  },
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
