'use client';

import ChatWindow from './components/chat/ChatWindow';
import ChatHeader from './components/header/ChatHeader';
import dynamic from 'next/dynamic';

const InputSkeleton = () => {
  return <div className="h-12 shrink-0 animate-spin" />;
};

const DynamicInputComponent = dynamic(
  () => import('./components/chat/input/InputComponent'),
  {
    ssr: false,
    loading: () => <InputSkeleton />,
  }
);

export default function Home() {
  return (
    <div className="flex h-svh items-center justify-center p-4 bg-[color: var(--color-bg-primary)]">
      <div className="flex flex-col h-full w-lvw max-w-[656px] bg-white overflow-hidden">
        <ChatHeader />
        <ChatWindow />
        <DynamicInputComponent />
      </div>
    </div>
  );
}
