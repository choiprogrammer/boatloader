import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',
      toasts: [],
      activeModal: null,
      modalData: null,
      searchOpen: false,
      searchHistory: [],
      shortcutsOpen: false,
      sidebarCollapsed: false,
      onboardingDone: false,

      toggleTheme: () => set((s) => {
        const next = s.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        return { theme: next };
      }),
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },

      addToast: (message, type = 'success', duration = 3500) => {
        const id = Date.now() + Math.random();
        set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
        setTimeout(() => set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) })), duration);
      },
      removeToast: (id) => set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) })),

      openModal: (name, data = null) => set({ activeModal: name, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),

      openSearch: () => set({ searchOpen: true }),
      closeSearch: () => set({ searchOpen: false }),
      addSearchHistory: (q) => set((s) => ({
        searchHistory: [q, ...s.searchHistory.filter(x => x !== q)].slice(0, 8),
      })),

      toggleShortcuts: () => set((s) => ({ shortcutsOpen: !s.shortcutsOpen })),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      completeOnboarding: () => set({ onboardingDone: true }),
    }),
    { name: 'modforge-ui', partialize: (s) => ({ theme: s.theme, searchHistory: s.searchHistory, sidebarCollapsed: s.sidebarCollapsed, onboardingDone: s.onboardingDone }) }
  )
);
