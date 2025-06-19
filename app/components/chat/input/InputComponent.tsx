import { Input } from 'antd';
import AtIcon from '@/app/components/icons/AtIcon';
import SmileIcon from '@/app/components/icons/SmileIcon';
import SendIcon from '@/app/components/icons/SendIcon';
import { useState } from 'react';

export default function InputComponent() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="border-t border-gray-300 px-5.5 py-3 shrink-0">
      <div className="flex gap-4">
        <button className="cursor-pointer hover:text-bg-user">
          <SmileIcon className="h-4 w-4" />
        </button>
        <Input
          placeholder="Start typing..."
          className="flex-1"
          variant="borderless"
          onFocus={handleFocus}
          onBlur={handleBlur}
          styles={{
            input: { padding: '0px' },
          }}
        />
        <button className="cursor-pointer  hover:text-bg-user">
          <AtIcon className="h-4 w-4" />
        </button>
        <button
          className={`cursor-pointer ${isFocused ? 'text-bg-user' : 'text-text-grayLight'}`}
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
