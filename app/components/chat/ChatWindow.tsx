import { useEffect, useRef } from 'react';
import DateComponent from '../date/DateComponent';
import BotMessage from './messages/bot/BotMessage';
import UserMessage from './messages/user/UserMessage';
import useMessageStore from '@/app/stores/useMessageStore';
import TypingIndicator from './indicator/TypingIndicator';
import { AnimatePresence } from 'framer-motion';

export default function ChatWindow() {
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messages = useMessageStore((state) => state.messages);
  const isBotTyping = useMessageStore((state) => state.isBotTyping);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  return (
    <div
      className="relative grow overflow-y-auto min-h-0 p-4 border-b border-gray-300 flex flex-col"
      ref={chatWindowRef}
    >
      <DateComponent />
      <AnimatePresence>
        {messages.map((message, index, allMessages) => {
          const prevMessage = allMessages[index - 1];
          let isConsecutive = false;
          if (prevMessage) {
            const isSameSender = prevMessage.sender === message.sender;
            const isWithinTimeframe =
              message.timestamp - prevMessage.timestamp < 30000;
            if (isSameSender && isWithinTimeframe) {
              isConsecutive = true;
            }
          }
          if (message.sender === 'user') {
            return (
              <UserMessage
                key={message.id}
                message={message}
                isConsecutive={isConsecutive}
              />
            );
          } else {
            return <BotMessage key={message.id} message={message} />;
          }
        })}
      </AnimatePresence>
      <div className="grow" />

      <div>{isBotTyping && <TypingIndicator />}</div>
    </div>
  );
}
