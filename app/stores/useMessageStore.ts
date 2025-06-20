import { create } from 'zustand';

interface Message {
  id: string;
  text: string;
  timestamp: number;
}

interface MessageStore {
  messages: Message[];
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (newMessage: Message) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),
}));

export default useMessageStore;
