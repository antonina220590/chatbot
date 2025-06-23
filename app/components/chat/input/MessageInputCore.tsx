import { Input } from 'antd';
import AtIcon from '@/app/components/icons/AtIcon';
import SmileIcon from '@/app/components/icons/SmileIcon';
import SendIcon from '@/app/components/icons/SendIcon';
import { useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

interface MessageInputCoreProps {
  showAttachButton?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;

  editMode?: boolean;
}

export default function MessageInputCore({
  showAttachButton = true,
  value,
  onChange,
  onSend,
  onKeyDown,
  editMode = false,
}: MessageInputCoreProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
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
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        value={value}
        styles={{
          input: { padding: '0px' },
        }}
      />

      {showAttachButton && (
        <button className="cursor-pointer hover:text-bg-user">
          <AtIcon className="h-4 w-4" />
        </button>
      )}

      <button
        onClick={onSend}
        className={`cursor-pointer ${isFocused ? 'text-bg-user' : 'text-text-grayLight'}`}
      >
        {editMode ? (
          <CheckCircleOutlined className="text-blue-500 text-xl" />
        ) : (
          <SendIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
