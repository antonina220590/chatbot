import { create } from 'zustand';

interface ViewingImage {
  url: string;
  width: number;
  height: number;
}

interface ImageStoreProps {
  isImageViewerOpen: boolean;
  viewingImage: ViewingImage | null;
  openImageViewer: (image: ViewingImage) => void;
  closeImageViewer: () => void;
}

const useImageViewerStore = create<ImageStoreProps>((set) => ({
  isImageViewerOpen: false,
  viewingImage: null,
  openImageViewer: (image) => {
    set({ isImageViewerOpen: true, viewingImage: image });
  },
  closeImageViewer: () => {
    set({
      isImageViewerOpen: false,
      viewingImage: null,
    });
  },
}));

export default useImageViewerStore;
