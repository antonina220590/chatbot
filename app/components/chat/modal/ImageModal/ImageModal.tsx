import Image from 'next/image';
import { Modal, notification } from 'antd';
import useImageViewerStore from '@/app/stores/useImageViewerStore';
import { DownloadOutlined, DownOutlined } from '@ant-design/icons';
import { downloadImage } from '@/app/utils/downloadImage';
import dayjs from 'dayjs';
import { useState } from 'react';
export default function ImageModal() {
  const isImageViewerOpen = useImageViewerStore(
    (state) => state.isImageViewerOpen
  );
  const viewingImage = useImageViewerStore((state) => state.viewingImage);
  const closeImageViewer = useImageViewerStore(
    (state) => state.closeImageViewer
  );

  const [api, contextHolder] = notification.useNotification();
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    if (!viewingImage || isDownloaded) return;

    try {
      const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
      const dynamicFilename = `image_${timestamp}.jpg`;
      await downloadImage(viewingImage.url, dynamicFilename);
      setIsDownloaded(true);
      setTimeout(() => {
        setIsDownloaded(false);
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        api.error({
          message: 'Downloading error',
          description: error.message,
          placement: 'topRight',
        });
      }
    }
  };

  if (!viewingImage) {
    return null;
  }

  return (
    <>
      {contextHolder}
      <div className="flex">
        <Modal
          open={isImageViewerOpen}
          footer={null}
          centered
          closable={false}
          onCancel={closeImageViewer}
          styles={{
            mask: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              padding: 0,
            },
          }}
        >
          <div className="h-svh flex flex-col gap-2">
            <div
              className="flex-grow flex justify-center items-center overflow-hidden"
              onClick={closeImageViewer}
            >
              <Image
                src={viewingImage?.url || ''}
                onClick={(e) => e.stopPropagation()}
                alt="image"
                width={viewingImage?.width}
                height={viewingImage?.height}
                quality={100}
                style={{
                  maxHeight: '98%',
                  maxWidth: '98%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
            <div className="flex-shrink-0 flex justify-center items-center p-3 bg-neutral-800 opacity-70 w-full rounded-lg">
              <button
                onClick={handleDownload}
                className={`text-white text-2xl p-2 rounded-full transition-all ${
                  isDownloaded
                    ? 'bg-green-500 cursor-default'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
                disabled={isDownloaded}
              >
                {isDownloaded ? <DownOutlined /> : <DownloadOutlined />}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
