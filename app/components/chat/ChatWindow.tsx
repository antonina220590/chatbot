import DateComponent from '../date/DateComponent';
import BotMessage from './messages/bot/BotMessage';

export default function ChatWindow() {
  return (
    <div className="grow overflow-y-auto min-h-0 p-4">
      <DateComponent />
      <BotMessage />
    </div>
  );
}
