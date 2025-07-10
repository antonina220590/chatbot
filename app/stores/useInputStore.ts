import { create } from 'zustand';

interface PreviewImage {
  url: string;
  width: number;
  height: number;
}

interface InputStore {
  inputValue: string;
  setInputValue: (newValue: string) => void;
  isAttachmentModalOpen: boolean;
  previewImage: PreviewImage | null;
  setPreviewImage: (image: PreviewImage | null) => void;
  openAttachmentModal: (textToTransfer: string) => void;
  closeAttachmentModal: () => void;
  captionForModal: string | null;
  clearInputState: () => void;
}

const useInputStore = create<InputStore>((set) => ({
  inputValue: '',
  previewImage: null,
  captionForModal: null,
  isAttachmentModalOpen: false,
  setInputValue: (newValue: string) => set(() => ({ inputValue: newValue })),
  openAttachmentModal: (textToTransfer) => {
    set({
      isAttachmentModalOpen: true,
      captionForModal: textToTransfer || null,
    });
  },

  closeAttachmentModal: () => {
    set({
      isAttachmentModalOpen: false,
      captionForModal: null,
    });
  },

  setPreviewImage: (image) => {
    set({ previewImage: image });
  },

  clearInputState: () =>
    set({
      inputValue: '',
      previewImage: null,
      isAttachmentModalOpen: false,
      captionForModal: null,
    }),
}));

export default useInputStore;
