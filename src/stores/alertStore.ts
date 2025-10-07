import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Alert } from '@/types';

type AlertState = {
  alerts: Alert[];
  isLoading: boolean;
  error: string | null;
  fetchAlerts: () => Promise<void>;
};
export const useAlertStore = create<AlertState>()(
  immer((set) => ({
    alerts: [],
    isLoading: false,
    error: null,
    fetchAlerts: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch('/mock/alerts.json');
        if (!response.ok) {
          throw new Error('Failed to fetch alerts from the server.');
        }
        const alerts: Alert[] = await response.json();
        set({ alerts, isLoading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch alerts';
        set({ error: errorMessage, isLoading: false });
        console.error(errorMessage);
      }
    },
  }))
);