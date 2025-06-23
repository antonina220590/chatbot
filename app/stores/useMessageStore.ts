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
  editingMessageId: string | null;
  addMessage: (text: string) => void;
  deleteMessage: (id: string) => void;
  startEditMessage: (id: string) => void;
  editMessage: (id: string, text: string) => void;
  submitEditMessage: (text: string) => void;
  cancelEditMessage: () => void;
}

const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  editingMessageId: null,
  addMessage: (text) => {
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

  startEditMessage: (id: string) => {
    const messageToEdit = get().messages.find(
      (message) => message.id === id && message.sender === 'user'
    );
    if (messageToEdit) {
      set({
        editingMessageId: id,
      });
    }
  },

  editMessage: (id: string, newText: string) => {
    set((state) => {
      const messageToEdit = state.messages.find(
        (message) => message.id === id && message.sender === 'user'
      );
      if (!messageToEdit) {
        return {};
      }
      if (newText.trim() === '') {
        return {};
      }
      return {
        messages: state.messages.map((message) =>
          message.id === id && message.sender === 'user'
            ? { ...message, text: newText.trim() }
            : message
        ),
      };
    });
  },

  submitEditMessage: (newText: string) => {
    const { editingMessageId, editMessage } = get();
    if (editingMessageId) {
      editMessage(editingMessageId, newText);
      set({ editingMessageId: null });
    }
  },

  cancelEditMessage: () => {
    set({ editingMessageId: null });
  },
}));

export default useMessageStore;
