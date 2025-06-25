import { create } from 'zustand';

interface PreviewImage {
  url: string;
  width: number;
  height: number;
}

interface InputStore {
  inputValue: string;
  isAttachmentModalOpen: boolean;
  setInputValue: (newValue: string) => void;
  previewImage: PreviewImage | null;
  setPreviewImage: (image: PreviewImage | null) => void;
  openAttachmentModal: () => void;
  closeAttachmentModal: () => void;
  clearInputState: () => void;
}

const useInputStore = create<InputStore>((set, get) => ({
  inputValue: '',
  setInputValue: (newValue: string) => set(() => ({ inputValue: newValue })),
  previewImage: null,
  isAttachmentModalOpen: false,
  setPreviewImage: (image) => {
    set({ previewImage: image });

    if (image) {
      get().openAttachmentModal();
    }
  },
  openAttachmentModal: () => set({ isAttachmentModalOpen: true }),
  closeAttachmentModal: () => set({ isAttachmentModalOpen: false }),
  clearInputState: () =>
    set({
      inputValue: '',
      previewImage: null,
      isAttachmentModalOpen: false,
    }),
}));

export default useInputStore;
