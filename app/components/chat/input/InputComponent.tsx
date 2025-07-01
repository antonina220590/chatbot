import useMessageStore from '@/app/stores/useMessageStore';
import MessageInputCore from './MessageInputCore';
import useInputStore from '@/app/stores/useInputStore';
import EditingMessage from '../edit/EditingMessage';
import { useCallback, useEffect, useRef } from 'react';
import { processImageFile } from '@/app/utils/processImage';
import ImageAttachModal from '../modal/ImageAttachModal/ImageAttachModal';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { notification } from 'antd';

export default function InputComponent() {
  const inputValue = useInputStore((state) => state.inputValue);
  const setInputValue = useInputStore((state) => state.setInputValue);
  const addMessage = useMessageStore((state) => state.addMessage);
  const editingMessageId = useMessageStore((state) => state.editingMessageId);
  const messages = useMessageStore((state) => state.messages);
  const submitEditMessage = useMessageStore((state) => state.submitEditMessage);
  const cancelEditMessage = useMessageStore((state) => state.cancelEditMessage);
  const setPreviewImage = useInputStore((state) => state.setPreviewImage);
  const openAttachmentModal = useInputStore(
    (state) => state.openAttachmentModal
  );
  const isAttachmentModalOpen = useInputStore(
    (state) => state.isAttachmentModalOpen
  );

  const [api, contextHolder] = notification.useNotification();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<TextAreaRef>(null);

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

  const handleSendMessage = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') return;
    if (editingMessageId) {
      submitEditMessage(trimmedValue);
    } else {
      addMessage({ text: trimmedValue });
    }
    setInputValue('');
    inputRef.current?.focus();
  }, [
    addMessage,
    editingMessageId,
    inputValue,
    setInputValue,
    submitEditMessage,
  ]);

  const handleCancelEdit = useCallback(() => {
    if (editingMessageId) {
      cancelEditMessage();
      setInputValue('');
    }
  }, [editingMessageId, cancelEditMessage, setInputValue]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        if (isAttachmentModalOpen) {
          return;
        }
        if (
          document.activeElement ===
          inputRef.current?.resizableTextArea?.textArea
        ) {
          return;
        }
        event.preventDefault();
        handleSendMessage();
      }
      if (event.key === 'Escape') {
        if (editingMessageId) {
          handleCancelEdit();
        }
        return;
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [
    editingMessageId,
    handleCancelEdit,
    handleSendMessage,
    isAttachmentModalOpen,
  ]);

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
      const textToMove = inputValue;
      const imageData = await processImageFile(file);
      setPreviewImage(imageData);
      setInputValue('');
      openAttachmentModal(textToMove);
    } catch (error) {
      if (error instanceof Error) {
        api.error({
          message: 'File processing error',
          description: error.message,
          placement: 'topRight',
        });
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className=" px-5.5 py-3 bg-bg-chat">
      {contextHolder}
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
        ref={inputRef}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/webp,image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
      />
      <ImageAttachModal />
    </div>
  );
}
