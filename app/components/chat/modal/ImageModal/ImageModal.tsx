'use client';
import Image from 'next/image';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import MessageInputCore from '../../input/MessageInputCore';
import useInputStore from '@/app/stores/useInputStore';
import useMessageStore from '@/app/stores/useMessageStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextAreaRef } from 'antd/es/input/TextArea';
export default function ImageModal() {
  const closeAttachmentModal = useInputStore(
    (state) => state.closeAttachmentModal
  );
  const clearInputState = useInputStore((state) => state.clearInputState);
  const previewImage = useInputStore((state) => state.previewImage);
  const addMessage = useMessageStore((state) => state.addMessage);
  const isAttachmentModalOpen = useInputStore(
    (state) => state.isAttachmentModalOpen
  );
  const captionForModal = useInputStore((state) => state.captionForModal);
  const modalInputRef = useRef<TextAreaRef>(null);

  const [caption, setCaption] = useState('');
  const isButtonActive = previewImage !== null;

  const handleSendWithImage = useCallback(() => {
    if (!previewImage) return;
    addMessage({
      text: caption.trim(),
      imageUrl: previewImage.url,
      width: previewImage.width,
      height: previewImage.height,
    });
    setCaption('');
    clearInputState();
  }, [addMessage, caption, clearInputState, previewImage]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendWithImage();
    }
  };

  const handleClose = () => {
    closeAttachmentModal();
    setCaption('');
    clearInputState();
  };

  useEffect(() => {
    if (isAttachmentModalOpen && captionForModal !== null) {
      setCaption(captionForModal);
    }
  }, [isAttachmentModalOpen, captionForModal]);

  useEffect(() => {
    const handleGlobalModalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        if (
          document.activeElement ===
          modalInputRef.current?.resizableTextArea?.textArea
        ) {
          return;
        }
        event.preventDefault();
        handleSendWithImage();
      }
    };
    if (isAttachmentModalOpen) {
      document.addEventListener('keydown', handleGlobalModalKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleGlobalModalKeyDown);
    };
  }, [isAttachmentModalOpen, handleSendWithImage]);

  if (!previewImage) {
    return null;
  }

  return (
    <div className="flex">
      <Modal
        width={400}
        centered
        open={isAttachmentModalOpen}
        closeIcon={null}
        footer={null}
        styles={{
          content: { padding: 0 },
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className=" text-bg-user cursor-pointer hover:text-red-500 pt-3 pr-3"
            >
              <CloseCircleOutlined style={{ fontSize: '20px' }} />
            </button>
          </div>
          <div className="flex justify-center p-3">
            <Image
              src={previewImage?.url || ''}
              alt="image"
              width={previewImage?.width}
              height={previewImage?.height}
              className="max-h-[60vh] inline-block overflow-hidden border-0 rounded-t-lg"
              quality={100}
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <div className="border-t-1 border-gray-300 w-full p-3">
            <MessageInputCore
              value={caption}
              onChange={setCaption}
              onSend={handleSendWithImage}
              forceSendActive={isButtonActive}
              onKeyDown={handleKeyDown}
              showAttachButton={false}
              ref={modalInputRef}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
