import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACHIEVEMENTS } from '../data/achievements.js';

const DEFAULT_USER = {
  id: 'usr-001',
  username: 'Steve_Builder',
  email: 'steve@minecraft.com',
  avatar: null,
  bio: 'Love building epic tech modpacks! 🔧',
  joinDate: '2024-01-15',
  socialLinks: { twitter: '', discord: '' },
  following: [],
  followers: [],
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      rememberMe: false,
      unlockedAchievements: [],
      notifications: [],
      stats: { modpacksCreated: 0, modsAdded: 0, exports: 0, ratings: 0, searches: 0 },

      login: (email, password, remember) => {
        const user = { ...DEFAULT_USER, email, username: email === 'steve@minecraft.com' ? 'Steve_Builder' : email.split('@')[0] };
        set({ user, isLoggedIn: true, rememberMe: remember });
        get().unlockAchievement('first-login');
        get().unlockAchievement('explorer');
      },
      signup: (username, email) => {
        const user = { ...DEFAULT_USER, username, email };
        set({ user, isLoggedIn: true });
        get().unlockAchievement('first-login');
      },
      logout: () => set({ user: null, isLoggedIn: false }),
      updateProfile: (data) => set((s) => ({ user: { ...s.user, ...data } })),
      updateAvatar: (dataUrl) => set((s) => ({ user: { ...s.user, avatar: dataUrl } })),
      incrementStat: (key) => set((s) => ({ stats: { ...s.stats, [key]: (s.stats[key] || 0) + 1 } })),

      unlockAchievement: (id) => {
        const { unlockedAchievements } = get();
        if (!unlockedAchievements.includes(id) && ACHIEVEMENTS.find(a => a.id === id)) {
          set((s) => ({ unlockedAchievements: [...s.unlockedAchievements, id] }));
          return true;
        }
        return false;
      },
      addNotification: (msg) => set((s) => ({
        notifications: [{ id: Date.now(), msg, read: false, time: new Date().toISOString() }, ...s.notifications].slice(0, 20)
      })),
      markNotificationsRead: () => set((s) => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) })),
    }),
    { name: 'modforge-auth' }
  )
);
