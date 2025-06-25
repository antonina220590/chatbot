import useMessageStore from '@/app/stores/useMessageStore';
import MessageInputCore from './MessageInputCore';
import useInputStore from '@/app/stores/useInputStore';
import EditingMessage from '../edit/EditingMessage';
import { useEffect, useRef } from 'react';
import { processImageFile } from '@/app/utils/processImage';
import ImageModal from '../modal/ImageModal/ImageModal';

export default function InputComponent() {
  const inputValue = useInputStore((state) => state.inputValue);
  const setInputValue = useInputStore((state) => state.setInputValue);
  const addMessage = useMessageStore((state) => state.addMessage);
  const editingMessageId = useMessageStore((state) => state.editingMessageId);
  const messages = useMessageStore((state) => state.messages);
  const submitEditMessage = useMessageStore((state) => state.submitEditMessage);
  const cancelEditMessage = useMessageStore((state) => state.cancelEditMessage);
  const setPreviewImage = useInputStore((state) => state.setPreviewImage);
  const previewImage = useInputStore((state) => state.previewImage);
  const clearInputState = useInputStore((state) => state.clearInputState);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingMessageId) {
      const messageToEdit = messages.find(
        (message) =>
          message.id === editingMessageId && message.sender === 'user'
      );
      if (messageToEdit) {
        setInputValue(messageToEdit.text ?? '');
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
    const imageToSend = previewImage;

    if (!trimmedValue && !imageToSend) return;

    if (trimmedValue && editingMessageId) {
      submitEditMessage(trimmedValue);
    } else {
      addMessage({
        text: trimmedValue,
        imageUrl: imageToSend?.url,
        width: imageToSend?.width,
        height: imageToSend?.height,
      });
    }
    clearInputState();
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

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file) return;

    try {
      const imageData = await processImageFile(file);
      setPreviewImage(imageData);
    } catch (error) {
      throw new Error(String(error));
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
        onAttachClick={handleAttachClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/webp,image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
      />
      <ImageModal />
    </div>
  );
}
