import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  text?: string;
  timestamp: number;
  sender: 'user' | 'bot';
  imageUrl?: string;
  width?: number;
  height?: number;
}

interface MessageData {
  text?: string;
  imageUrl?: string;
  width?: number;
  height?: number;
}

interface MessageStore {
  messages: Message[];
  editingMessageId: string | null;
  addMessage: (data: MessageData) => void;
  deleteMessage: (id: string) => void;
  clearChat: () => void;
  startEditMessage: (id: string) => void;
  editMessage: (id: string, text: string) => void;
  submitEditMessage: (text: string) => void;
  cancelEditMessage: () => void;
  isBotTyping: boolean;
}

let botReplyTimeoutId: NodeJS.Timeout | null = null;

const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      messages: [],
      editingMessageId: null,
      isBotTyping: false,
      addMessage: (data: MessageData) => {
        if (!data.text && !data.imageUrl) {
          return;
        }
        const newMessage: Message = {
          id: uuidv4(),
          sender: 'user',
          timestamp: Date.now(),
          text: data.text,
          imageUrl: data.imageUrl,
          width: data.width,
          height: data.height,
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
        }));

        if (botReplyTimeoutId === null) {
          set({ isBotTyping: true });
          botReplyTimeoutId = setTimeout(() => {
            const botMessage: Message = {
              id: uuidv4(),
              text: 'Hello World!',
              sender: 'bot',
              timestamp: Date.now(),
            };
            set((state) => ({
              messages: [...state.messages, botMessage],
            }));
            set({ isBotTyping: false });
            botReplyTimeoutId = null;
          }, 3500);
        }
      },

      deleteMessage(id: string) {
        set((state) => ({
          messages: state.messages.filter((message) => message.id !== id),
        }));
      },

      clearChat() {
        set({
          messages: [],
          editingMessageId: null,
          isBotTyping: false,
        });
        if (botReplyTimeoutId) {
          clearTimeout(botReplyTimeoutId);
          botReplyTimeoutId = null;
        }
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
    }),
    {
      name: 'message-store',
    }
  )
);

export default useMessageStore;
