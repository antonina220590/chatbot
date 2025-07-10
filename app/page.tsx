'use client';

import ChatWindow from './components/chat/ChatWindow';
import ImageModal from './components/chat/modal/ImageModal/ImageModal';
import ChatHeader from './components/header/ChatHeader';
import dynamic from 'next/dynamic';

const InputSkeleton = () => {
  return <div className="h-12 shrink-0 bg-bg-chat" />;
};

const DynamicInputComponent = dynamic(
  () => import('./components/chat/input/InputComponent/InputComponent'),
  {
    ssr: false,
    loading: () => <InputSkeleton />,
  }
);

export default function Home() {
  return (
    <div className="flex h-dvh items-center justify-center sm:p-4 xs:p-0 bg-[color: var(--color-bg-primary)]">
      <div className="flex flex-col h-full w-full max-w-[656px] bg-white overflow-hidden">
        <ChatHeader />
        <ChatWindow />
        <DynamicInputComponent />
        <ImageModal />
      </div>
    </div>
  );
}
