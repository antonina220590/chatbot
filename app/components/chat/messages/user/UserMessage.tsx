import UserBubble from '@/app/components/icons/UserBubble';
import CheckIcon from '@/app/components/icons/CheckIcon';
import dayjs from 'dayjs';
import Image from 'next/image';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useMessageStore, { Message } from '@/app/stores/useMessageStore';
import { motion } from 'framer-motion';

interface UserMessageProps {
  message: Message;
  isConsecutive?: boolean;
}
export default function UserMessage({
  message,
  isConsecutive,
}: UserMessageProps) {
  const deleteMessage = useMessageStore((state) => state.deleteMessage);
  const startEditMessage = useMessageStore((state) => state.startEditMessage);

  const handleDelete = () => {
    if (deleteMessage) {
      deleteMessage(message.id);
    }
  };

  const handleEditClick = () => {
    if (startEditMessage) {
      startEditMessage(message.id);
    }
  };

  const animationVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
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
      <div className="mb-4 mr-4">
        <div className="flex justify-end gap-2 ">
          <div className="relative flex flex-col bg-bg-user rounded-lg px-2 py-1 gap-1 xs:min-w-40 max-w-xs">
            {!isConsecutive && <UserBubble />}
            <div className="flex flex-col">
              {message.imageUrl && message.width && message.height && (
                <div className="p-3">
                  <Image
                    src={message.imageUrl}
                    alt={message.text || 'User uploaded image'}
                    width={message.width}
                    height={message.height}
                    className="max-h-[60vh] inline-block overflow-hidden border-0 rounded-md"
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              )}
              {message.text && (
                <div className="p-2">
                  <span className="text-white font-body font-normal text-sm flex break-words">
                    {message.text}
                  </span>
                </div>
              )}
              <div className="flex justify-end items-center gap-1">
                <span className="font-body shrink-0 font-light text-xs text-text-light flex justify-end">
                  {dayjs(message.timestamp).format('h:mm A')}
                </span>
                <CheckIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-[10px] mt-[6px]">
          <button
            type="button"
            onClick={handleEditClick}
            className="
            text-gray-400 text-xs transition-colors
            hover:text-bg-user
            [&_.anticon_svg]:fill-current
            cursor-pointer
          "
          >
            <EditOutlined />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-gray-400 text-xs transition-colors
            hover:text-red-500
            [&_.anticon_svg]:fill-current
            cursor-pointer"
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
