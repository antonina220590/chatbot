import dayjs from 'dayjs';
import Image from 'next/image';
import BotBubble from '@/app/components/icons/BotBubble';

export default function BotMessage() {
  return (
    <div className="flex justify-start gap-2">
      <div>
        <div className="relative">
          <Image
            src="/janet.png"
            alt="bot avatar"
            width={32}
            height={32}
            quality={100}
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-[1.25px] border-white"></div>
        </div>
      </div>
      <div className="relative flex flex-col bg-bg-primary rounded-lg px-2 py-1 gap-1 xs:min-w-40">
        <BotBubble />
        <div className="flex flex-row gap-2.5 items-center flex-wrap">
          <span className="font-body font-semibold text-sm text-text-grayDark">
            Janet
          </span>
          <span className="font-body font-normal text-xs text-text-gray">
            Bot
          </span>
        </div>
        <span className="font-body font-normal text-sm text-text-grayDark">
          Hello World!
        </span>
        <span className="font-body shrink-0 font-light text-xs text-text-gray flex justify-end">
          {dayjs().format('h:mm A')}
        </span>
      </div>
    </div>
  );
}
