import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: 'user' | 'bot';
}

interface MessageStore {
  messages: Message[];
  addMessage: (text: string) => void;
  deleteMessage?: (id: string) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (text: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      text: text,
      sender: 'user',
      timestamp: Date.now(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  deleteMessage(id: string) {
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== id),
    }));
  },
}));

export default useMessageStore;
