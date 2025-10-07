import { create } from 'zustand';
type Theme = 'light' | 'dark' | 'system';
type AppState = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  theme: (localStorage.getItem('aegis-theme') as Theme) || 'dark',
  setTheme: (theme) => {
    localStorage.setItem('aegis-theme', theme);
    set({ theme });
  },
}));