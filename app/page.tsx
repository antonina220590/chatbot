'use client';

import ChatWindow from './components/chat/ChatWindow';
import InputComponent from './components/chat/input/InputComponent';
import ChatHeader from './components/header/ChatHeader';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center p-4 bg-[color: var(--color-bg-primary)]">
      <div className="flex flex-col h-full w-full max-w-[656px] bg-white overflow-hidden">
        <ChatHeader />
        <ChatWindow />
        <InputComponent />
      </div>
    </div>
  );
}
