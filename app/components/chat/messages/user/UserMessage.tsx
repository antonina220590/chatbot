import UserBubble from '@/app/components/icons/UserBubble';
import CheckIcon from '@/app/components/icons/CheckIcon';
import dayjs from 'dayjs';
import Image from 'next/image';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useMessageStore, { Message } from '@/app/stores/useMessageStore';

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

  return (
    <div className="mb-4 mr-4">
      <div className="flex justify-end gap-2 ">
        <div className="relative flex flex-col bg-bg-user rounded-lg px-2 py-1 gap-1 xs:min-w-40 max-w-xs">
          {!isConsecutive && <UserBubble />}
          <div className="flex flex-col">
            {message.imageUrl && message.width && message.height && (
              <Image
                src={message.imageUrl}
                alt={message.text || 'User uploaded image'}
                width={message.width}
                height={message.height}
                className="max-w-full h-auto rounded-t-lg z-10"
                style={{
                  borderBottomLeftRadius: message.text ? 0 : '',
                  borderBottomRightRadius: message.text ? 0 : '',
                }}
              />
            )}
            {message.text && (
              <div className="p-2">
                {' '}
                <span className="text-white font-jost font-normal text-medium flex break-words">
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
    </div>
  );
}
