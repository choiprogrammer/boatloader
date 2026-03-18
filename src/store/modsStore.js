import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MODS } from '../data/mods.js';

export const useModsStore = create(
  persist(
    (set, get) => ({
      filters: { category: 'all', loader: 'all', mcVersion: 'all', search: '', tags: [] },
      sortBy: 'downloads',
      viewMode: 'grid',
      page: 1,
      perPage: 18,
      ratings: {}, // modId -> 1-5
      favorites: [],

      setFilter: (key, val) => set((s) => ({ filters: { ...s.filters, [key]: val }, page: 1 })),
      clearFilters: () => set({ filters: { category: 'all', loader: 'all', mcVersion: 'all', search: '', tags: [] }, page: 1 }),
      setSortBy: (v) => set({ sortBy: v, page: 1 }),
      setViewMode: (v) => set({ viewMode: v }),
      setPage: (p) => set({ page: p }),
      toggleTag: (tag) => set((s) => ({
        filters: { ...s.filters, tags: s.filters.tags.includes(tag) ? s.filters.tags.filter(t => t !== tag) : [...s.filters.tags, tag] },
        page: 1,
      })),
      rateMod: (modId, stars) => set((s) => ({ ratings: { ...s.ratings, [modId]: stars } })),
      toggleFavorite: (modId) => set((s) => ({
        favorites: s.favorites.includes(modId) ? s.favorites.filter(id => id !== modId) : [...s.favorites, modId]
      })),

      getFilteredMods: () => {
        const { filters, sortBy } = get();
        let result = [...MODS];
        if (filters.category !== 'all') result = result.filter(m => m.category === filters.category);
        if (filters.loader !== 'all') result = result.filter(m => m.loaders.includes(filters.loader));
        if (filters.mcVersion !== 'all') result = result.filter(m => m.mcVersions.includes(filters.mcVersion));
        if (filters.search) result = result.filter(m => m.name.toLowerCase().includes(filters.search.toLowerCase()) || m.description.toLowerCase().includes(filters.search.toLowerCase()) || m.author.toLowerCase().includes(filters.search.toLowerCase()));
        if (filters.tags.length) result = result.filter(m => filters.tags.every(t => m.tags.includes(t)));
        result.sort((a, b) => {
          if (sortBy === 'downloads') return b.downloads - a.downloads;
          if (sortBy === 'rating') return b.rating - a.rating;
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'updated') return new Date(b.lastUpdated) - new Date(a.lastUpdated);
          return 0;
        });
        return result;
      },
    }),
    { name: 'modforge-mods', partialize: (s) => ({ ratings: s.ratings, favorites: s.favorites, viewMode: s.viewMode }) }
  )
);
