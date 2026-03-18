import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SAMPLE_MODPACKS } from '../data/modpacks.js';
import { MODS } from '../data/mods.js';

const MAX_HISTORY = 20;

export const useModpackStore = create(
  persist(
    (set, get) => ({
      modpacks: SAMPLE_MODPACKS,
      activeModpackId: null,
      undoStack: [],
      redoStack: [],
      activityLog: [],

      getActive: () => {
        const { modpacks, activeModpackId } = get();
        return modpacks.find(p => p.id === activeModpackId) || null;
      },

      setActive: (id) => set({ activeModpackId: id }),

      createModpack: (data) => {
        const id = 'mp-' + Date.now();
        const mp = {
          id, modIds: [], downloads: 0, votes: 0, history: [],
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          version: '1.0.0', privacy: 'private', ...data
        };
        set((s) => ({ modpacks: [...s.modpacks, mp], activeModpackId: id }));
        get()._log('Created modpack: ' + data.name);
        return id;
      },

      updateModpack: (id, changes) => {
        const prev = get().modpacks.find(p => p.id === id);
        if (!prev) return;
        get()._pushUndo(prev);
        set((s) => ({ modpacks: s.modpacks.map(p => p.id === id ? { ...p, ...changes, updatedAt: new Date().toISOString() } : p) }));
      },

      deleteModpack: (id) => {
        set((s) => ({
          modpacks: s.modpacks.filter(p => p.id !== id),
          activeModpackId: s.activeModpackId === id ? null : s.activeModpackId,
        }));
        get()._log('Deleted modpack');
      },

      cloneModpack: (id) => {
        const src = get().modpacks.find(p => p.id === id);
        if (!src) return;
        const newId = 'mp-' + Date.now();
        const clone = { ...src, id: newId, name: src.name + ' (Copy)', downloads: 0, votes: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), history: [] };
        set((s) => ({ modpacks: [...s.modpacks, clone] }));
        get()._log('Cloned modpack: ' + src.name);
        return newId;
      },

      addModToModpack: (modpackId, modId) => {
        const mp = get().modpacks.find(p => p.id === modpackId);
        if (!mp || mp.modIds.includes(modId)) return;
        get()._pushUndo(mp);
        set((s) => ({ modpacks: s.modpacks.map(p => p.id === modpackId ? { ...p, modIds: [...p.modIds, modId], updatedAt: new Date().toISOString() } : p) }));
      },

      removeModFromModpack: (modpackId, modId) => {
        const mp = get().modpacks.find(p => p.id === modpackId);
        if (!mp) return;
        get()._pushUndo(mp);
        set((s) => ({ modpacks: s.modpacks.map(p => p.id === modpackId ? { ...p, modIds: p.modIds.filter(id => id !== modId), updatedAt: new Date().toISOString() } : p) }));
      },

      reorderMods: (modpackId, newOrder) => {
        set((s) => ({ modpacks: s.modpacks.map(p => p.id === modpackId ? { ...p, modIds: newOrder } : p) }));
      },

      rollbackVersion: (modpackId, historyIndex) => {
        const mp = get().modpacks.find(p => p.id === modpackId);
        if (!mp || !mp.history[historyIndex]) return;
        get()._log('Rolled back to v' + mp.history[historyIndex].version);
      },

      voteModpack: (id, dir) => {
        set((s) => ({ modpacks: s.modpacks.map(p => p.id === id ? { ...p, votes: Math.max(0, p.votes + dir) } : p) }));
      },

      undo: () => {
        const { undoStack } = get();
        if (!undoStack.length) return;
        const prev = undoStack[undoStack.length - 1];
        const current = get().modpacks.find(p => p.id === prev.id);
        set((s) => ({
          undoStack: s.undoStack.slice(0, -1),
          redoStack: current ? [...s.redoStack, current] : s.redoStack,
          modpacks: s.modpacks.map(p => p.id === prev.id ? prev : p),
        }));
      },

      redo: () => {
        const { redoStack } = get();
        if (!redoStack.length) return;
        const next = redoStack[redoStack.length - 1];
        const current = get().modpacks.find(p => p.id === next.id);
        set((s) => ({
          redoStack: s.redoStack.slice(0, -1),
          undoStack: current ? [...s.undoStack, current] : s.undoStack,
          modpacks: s.modpacks.map(p => p.id === next.id ? next : p),
        }));
      },

      _pushUndo: (state) => {
        set((s) => ({ undoStack: [...s.undoStack, state].slice(-MAX_HISTORY), redoStack: [] }));
      },

      _log: (action) => {
        set((s) => ({
          activityLog: [{ id: Date.now(), action, time: new Date().toISOString() }, ...s.activityLog].slice(0, 50)
        }));
      },

      exportModpack: (id, format) => {
        const mp = get().modpacks.find(p => p.id === id);
        if (!mp) return null;
        const mods = mp.modIds.map(mid => MODS.find(m => m.id === mid)).filter(Boolean);
        if (format === 'json') return JSON.stringify({ ...mp, mods }, null, 2);
        if (format === 'curseforge') return JSON.stringify({ manifestType: 'minecraftModpack', manifestVersion: 1, name: mp.name, minecraft: { version: mp.mcVersion, modLoaders: [{ id: mp.loader + '-latest', primary: true }] }, files: mods.map(m => ({ projectID: m.id * 100, fileID: m.id * 1000, required: true })) }, null, 2);
        return JSON.stringify({ name: mp.name, mods: mods.map(m => m.slug) }, null, 2);
      },

      getTotalSize: (id) => {
        const mp = get().modpacks.find(p => p.id === id);
        if (!mp) return '0 MB';
        const total = mp.modIds.reduce((sum, mid) => {
          const mod = MODS.find(m => m.id === mid);
          return sum + (mod ? parseFloat(mod.size) : 0);
        }, 0);
        return total.toFixed(1) + ' MB';
      },
    }),
    { name: 'modforge-modpacks' }
  )
);
