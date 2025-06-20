import { create } from 'zustand';

interface InputStore {
  inputValue: string;
  setInputValue: (input: string) => void;
}

const useInputStore = create<InputStore>((set) => ({
  inputValue: '',
  setInputValue: (newValue: string) =>
    set(() => ({
      inputValue: newValue,
    })),
}));

export default useInputStore;
