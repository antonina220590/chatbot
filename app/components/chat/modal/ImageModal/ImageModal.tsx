'use client';
import Image from 'next/image';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useState } from 'react';
import InputComponent from '../../input/MessageInputCore';
export default function ImageModal() {
  const [isModalOpen, _setIsModalOpen] = useState(true);
  return (
    <div className="flex">
      <Modal
        width={300}
        centered
        open={isModalOpen}
        closeIcon={null}
        footer={null}
        styles={{
          content: { padding: 0 },
        }}
      >
        <div className="flex flex-col gap-3">
          <button className="flex justify-end text-bg-user cursor-pointer hover:text-red-500 pt-3 pr-3">
            <CloseCircleOutlined style={{ fontSize: '20px' }} />
          </button>
          <div className="flex justify-center p-3">
            <Image
              src="/example.jpg"
              alt="test"
              width={200}
              height={250}
              quality={100}
            />
          </div>
          <div className="border-t-0 border-gray-300 w-full">
            <InputComponent showAttachButton={false} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
