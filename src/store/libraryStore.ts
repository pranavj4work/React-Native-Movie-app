import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Movie, MovieDetails, SavedMovie } from '@/types/movie';
import { toSavedMovie } from '@/utils/format';

type LibraryState = {
  favorites: SavedMovie[];
  watchlist: SavedMovie[];
  toggleFavorite: (movie: Movie | MovieDetails | SavedMovie) => void;
  toggleWatchlist: (movie: Movie | MovieDetails | SavedMovie) => void;
  isFavorite: (id: number) => boolean;
  isOnWatchlist: (id: number) => boolean;
};

function upsert(list: SavedMovie[], movie: SavedMovie): SavedMovie[] {
  const exists = list.some((item) => item.id === movie.id);
  if (exists) {
    return list.filter((item) => item.id !== movie.id);
  }
  return [movie, ...list];
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      toggleFavorite: (movie) => {
        const saved = toSavedMovie(movie);
        set((state) => ({ favorites: upsert(state.favorites, saved) }));
      },
      toggleWatchlist: (movie) => {
        const saved = toSavedMovie(movie);
        set((state) => ({ watchlist: upsert(state.watchlist, saved) }));
      },
      isFavorite: (id) => get().favorites.some((movie) => movie.id === id),
      isOnWatchlist: (id) => get().watchlist.some((movie) => movie.id === id),
    }),
    {
      name: 'cine-library',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        watchlist: state.watchlist,
      }),
    },
  ),
);
