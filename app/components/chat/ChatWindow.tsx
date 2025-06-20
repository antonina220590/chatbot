import DateComponent from '../date/DateComponent';
import BotMessage from './messages/bot/BotMessage';
import UserMessage from './messages/user/UserMessage';
import useMessageStore from '@/app/stores/useMessageStore';

export default function ChatWindow() {
  const { messages } = useMessageStore();
  return (
    <div className="grow overflow-y-auto min-h-0 p-4">
      <DateComponent />
      <BotMessage />
      {messages.map((message) => (
        <UserMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
