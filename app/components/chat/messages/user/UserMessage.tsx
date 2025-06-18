import UserBubble from '@/app/components/icons/UserBubble';
import dayjs from 'dayjs';

export default function UserMessage() {
  return (
    <div className="flex justify-end gap-2">
      <div className="relative flex flex-col bg-bg-user rounded-lg px-2 py-1 gap-1 xs:min-w-40">
        <UserBubble />
        <span className="font-body font-normal text-sm text-text-light">
          Hello World!
        </span>
        <span className="font-body shrink-0 font-light text-xs text-text-light flex justify-end">
          {dayjs().format('h:mm A')}
        </span>
      </div>
    </div>
  );
}
