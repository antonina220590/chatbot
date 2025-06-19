import UserBubble from '@/app/components/icons/UserBubble';
import CheckIcon from '@/app/components/icons/CheckIcon';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function UserMessage() {
  return (
    <div className="mb-4 mr-4">
      <div className="flex justify-end gap-2 ">
        <div className="relative flex flex-col bg-bg-user rounded-lg px-2 py-1 gap-1 xs:min-w-40">
          <UserBubble />
          <span className="font-body font-normal text-sm text-text-light mr-20">
            Anyone on for lunch today?
          </span>
          <div className="flex justify-end items-center gap-1">
            <span className="font-body shrink-0 font-light text-xs text-text-light flex justify-end">
              {dayjs().format('h:mm A')}
            </span>
            <CheckIcon />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-[10px] mt-[6px]">
        <button
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
          className="text-gray-400 text-xs transition-colors
            hover:text-red-500
            [&_.anticon_svg]:fill-current
            cursor-pointer"
        >
          <DeleteOutlined />
        </button>
      </div>
    </div>
  );
}
