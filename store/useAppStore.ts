import { create } from 'zustand';

interface AppState {
  currentRoute: string;
  isTransitioning: boolean;
  qualityTier: 'low' | 'medium' | 'high';
  loadedStatus: Record<string, boolean>;
  setCurrentRoute: (route: string) => void;
  setTransitioning: (status: boolean) => void;
  setQualityTier: (tier: 'low' | 'medium' | 'high') => void;
  setLoaded: (route: string, status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentRoute: '/',
  isTransitioning: false,
  qualityTier: 'medium',
  loadedStatus: {},
  setCurrentRoute: (route) => set({ currentRoute: route }),
  setTransitioning: (status) => set({ isTransitioning: status }),
  setQualityTier: (tier) => set({ qualityTier: tier }),
  setLoaded: (route, status) =>
    set((state) => ({
      loadedStatus: { ...state.loadedStatus, [route]: status },
    })),
}));
