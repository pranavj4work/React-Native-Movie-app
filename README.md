# RNMovie

A job-ready React Native movie app built with Expo, TypeScript, TMDB, React Navigation, TanStack Query, Axios, and Zustand.

## What it demonstrates

- Home feed with **Trending / Popular**, `FlatList`, infinite scroll, and pull-to-refresh
- Search with **300ms debounce**, genre / year / rating filters, and discover vs search endpoints
- Movie detail with poster, overview, rating, and cast
- Favorites and watchlist persisted with **Zustand + AsyncStorage**
- Bottom tabs + a root stack for detail (tab bar hides on the movie screen)
- Loading, error, and empty states
- Dark / light / system theme

## Architecture

```
src/
  api/           Axios TMDB client and typed endpoints
  hooks/         TanStack Query hooks + debounce
  store/         Zustand (theme, library) — local user state only
  navigation/    Typed React Navigation (tabs + stack)
  screens/       Home, Search, Detail, Library, Settings
  components/    Shared UI (cards, filters, empty/error states)
  theme/         Light and dark palettes
```

Server cache lives in React Query. User data (favorites, watchlist, theme) lives in Zustand. That split is intentional.

```
Home / Search  -->  TMDB (React Query)  -->  Movie Detail
Library        -->  AsyncStorage (Zustand) -->  Movie Detail
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a TMDB account and copy a **Read Access Token (v4)** from [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

3. Copy the env file and paste the token:

```bash
cp .env.example .env
```

```
EXPO_PUBLIC_TMDB_ACCESS_TOKEN=your_token_here
```

4. Start Expo. Restart the bundler after changing `.env` so the public token is picked up.

```bash
npx expo start
```

Then open iOS Simulator, Android emulator, or Expo Go.

## Demo script (interviews)

1. Home: switch Trending / Popular, scroll to load the next page, pull to refresh.
2. Search: type a title (debounce), then filter by genre, year, or rating. Clear the query and browse with Discover.
3. Open a movie: poster, overview, rating, cast. Toggle Favorite and Watchlist.
4. Library: confirm both lists persist after a reload.
5. Settings: switch Light / Dark / System and point out TMDB attribution.

## Notes

- Images are loaded with `expo-image` from `https://image.tmdb.org/t/p/...`.
- Missing posters fall back to a film icon.
- This product uses the TMDB API but is not endorsed or certified by TMDB.
