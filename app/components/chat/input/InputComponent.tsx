import useMessageStore from '@/app/stores/useMessageStore';
import MessageInputCore from './MessageInputCore';
import useInputStore from '@/app/stores/useInputStore';
import EditingMessage from '../edit/EditingMessage';
import { useEffect } from 'react';

export default function InputComponent() {
  const inputValue = useInputStore((state) => state.inputValue);
  const setInputValue = useInputStore((state) => state.setInputValue);
  const addMessage = useMessageStore((state) => state.addMessage);
  const editingMessageId = useMessageStore((state) => state.editingMessageId);
  const messages = useMessageStore((state) => state.messages);
  const submitEditMessage = useMessageStore((state) => state.submitEditMessage);
  const cancelEditMessage = useMessageStore((state) => state.cancelEditMessage);

  useEffect(() => {
    if (editingMessageId) {
      const messageToEdit = messages.find(
        (message) =>
          message.id === editingMessageId && message.sender === 'user'
      );
      if (messageToEdit) {
        setInputValue(messageToEdit.text);
      }
    }
  }, [editingMessageId, messages, setInputValue]);

  const currentMessageToEdit = editingMessageId
    ? messages.find((message) => message.id === editingMessageId)?.text || ''
    : '';

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleSendMessage = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') return;
    if (trimmedValue && editingMessageId) {
      submitEditMessage(trimmedValue);
    } else {
      addMessage(trimmedValue);
    }
    setInputValue('');
  };

  const handleCancelEdit = () => {
    if (editingMessageId) {
      cancelEditMessage();
      setInputValue('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className=" px-5.5 py-3">
      {editingMessageId && (
        <EditingMessage
          messageText={currentMessageToEdit}
          onCancel={handleCancelEdit}
        />
      )}
      <MessageInputCore
        value={inputValue}
        onChange={handleChange}
        onSend={handleSendMessage}
        onKeyDown={handleKeyDown}
        editMode={editingMessageId !== null}
      />
    </div>
  );
}
