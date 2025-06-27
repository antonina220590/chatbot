import dayjs from 'dayjs';
import Image from 'next/image';
import BotBubble from '@/app/components/icons/BotBubble';
import { Message } from '@/app/stores/useMessageStore';
import { motion } from 'framer-motion';

interface BotMessageProps {
  message: Message;
}

export default function BotMessage({ message }: BotMessageProps) {
  const animationVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
  };
  return (
    <motion.div
      layout
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex justify-start gap-2 mb-4">
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
            {message.text}
          </span>
          <span className="font-body shrink-0 font-light text-xs text-text-gray flex justify-end">
            {dayjs(message.timestamp).format('h:mm A')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
