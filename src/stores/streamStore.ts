import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Stream } from '@/types';

type StreamState = {
  streams: Stream[];
  isLoading: boolean;
  error: string | null;
  fetchStreams: () => Promise<void>;
  addStream: (stream: Omit<Stream, 'id' | 'thumbnailUrl'>) => void;
  updateStream: (stream: Stream) => void;
  deleteStream: (streamId: string) => void;
};
export const useStreamStore = create<StreamState>()(
  immer((set) => ({
    streams: [],
    isLoading: false,
    error: null,
    fetchStreams: async () => {
      set({ isLoading: true, error: null });
      try {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockStreams: Stream[] = [
          {
            id: 'stream-1',
            name: 'Parking Lot Cam',
            url: 'rtsp://192.168.1.10/stream1',
            description: 'Monitors the main parking lot entrance.',
            thumbnailUrl: 'https://picsum.photos/seed/1/400/300',
          },
          {
            id: 'stream-2',
            name: 'Lobby Entrance',
            url: 'rtsp://192.168.1.12/stream1',
            description: 'Covers the main lobby and reception desk.',
            thumbnailUrl: 'https://picsum.photos/seed/2/400/300',
          },
        ];
        set({ streams: mockStreams, isLoading: false });
      } catch (error) {
        set({ error: 'Failed to fetch streams', isLoading: false });
      }
    },
    addStream: (stream) => {
      const newStream: Stream = {
        ...stream,
        id: `stream-${Date.now()}`,
        thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
      };
      set((state) => {
        state.streams.push(newStream);
      });
    },
    updateStream: (updatedStream) => {
      set((state) => {
        const index = state.streams.findIndex((s) => s.id === updatedStream.id);
        if (index !== -1) {
          state.streams[index] = updatedStream;
        }
      });
    },
    deleteStream: (streamId) => {
      set((state) => {
        state.streams = state.streams.filter((s) => s.id !== streamId);
      });
    },
  }))
);