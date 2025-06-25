'use client';
import Image from 'next/image';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import MessageInputCore from '../../input/MessageInputCore';
import useInputStore from '@/app/stores/useInputStore';
import useMessageStore from '@/app/stores/useMessageStore';
import { useState } from 'react';
export default function ImageModal() {
  const isAttachmentModalOpen = useInputStore(
    (state) => state.isAttachmentModalOpen
  );
  const closeAttachmentModal = useInputStore(
    (state) => state.closeAttachmentModal
  );
  const clearInputState = useInputStore((state) => state.clearInputState);
  const previewImage = useInputStore((state) => state.previewImage);
  const addMessage = useMessageStore((state) => state.addMessage);
  const [caption, setCaption] = useState('');
  const isButtonActive = previewImage !== null;

  const handleSendWithImage = () => {
    if (!previewImage) return;
    addMessage({
      text: caption.trim(),
      imageUrl: previewImage.url,
      width: previewImage.width,
      height: previewImage.height,
    });
    setCaption('');
    clearInputState();
  };

  const handleClose = () => {
    closeAttachmentModal();
    setCaption('');
    clearInputState();
  };

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
          <button
            onClick={handleClose}
            className="flex justify-end text-bg-user cursor-pointer hover:text-red-500 pt-3 pr-3"
          >
            <CloseCircleOutlined style={{ fontSize: '20px' }} />
          </button>
          <div className="flex justify-center p-3">
            <Image
              src={previewImage?.url || ''}
              alt="image"
              width={previewImage?.width}
              height={previewImage?.height}
              quality={100}
            />
          </div>
          <div className="border-t-1 border-gray-300 w-full p-3">
            <MessageInputCore
              value={caption}
              onChange={setCaption}
              onSend={handleSendWithImage}
              showAttachButton={false}
              forceSendActive={isButtonActive}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
