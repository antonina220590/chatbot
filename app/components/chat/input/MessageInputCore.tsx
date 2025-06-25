import { Input, Popover } from 'antd';
import AtIcon from '@/app/components/icons/AtIcon';
import SmileIcon from '@/app/components/icons/SmileIcon';
import SendIcon from '@/app/components/icons/SendIcon';
import { useEffect, useRef, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import EmojiContent from '../modal/EmojiModal/EmojiModal';
import type { TextAreaRef } from 'antd/es/input/TextArea';

interface MessageInputCoreProps {
  showAttachButton?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  editMode?: boolean;
  onAttachClick?: () => void;

  forceSendActive?: boolean;
}

export default function MessageInputCore({
  showAttachButton = true,
  value,
  onChange,
  onSend,
  onKeyDown,
  editMode = false,
  onAttachClick,
  forceSendActive = false,
}: MessageInputCoreProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const inputRef = useRef<TextAreaRef | null>(null);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleEmojiSelect = (emoji: string) => {
    const inputElement = inputRef.current?.resizableTextArea?.textArea;
    if (!inputElement) return;
    const cursor = inputElement.selectionStart ?? (value ? value.length : 0);
    const textBeforeEmoji = value?.slice(0, cursor);
    const textAfterEmoji = value?.slice(cursor);
    const newText = textBeforeEmoji + emoji + textAfterEmoji;
    setCursorPosition(cursor + emoji.length);
    onChange?.(newText);
  };

  useEffect(() => {
    const inputElement = inputRef.current?.resizableTextArea?.textArea;
    if (inputElement && cursorPosition !== null) {
      inputElement.selectionStart = cursorPosition;
      inputElement.selectionEnd = cursorPosition;
      setCursorPosition(null);
    }
  }, [value, cursorPosition]);

  const isButtonActive = isFocused || value !== '' || forceSendActive;

  return (
    <div className="flex gap-4 items-end">
      <Popover
        content={<EmojiContent onEmojiSelect={handleEmojiSelect} />}
        trigger="hover"
        placement="topLeft"
        arrow={false}
      >
        <button className="cursor-pointer hover:text-bg-user pb-1">
          <SmileIcon className="h-4 w-4" />
        </button>
      </Popover>
      <div className="flex-1 max-h-[40vh] overflow-hidden">
        <Input.TextArea
          placeholder="Start typing..."
          className="w-full align-top"
          variant="borderless"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={onKeyDown}
          value={value}
          ref={inputRef}
          autoSize={{ minRows: 1, maxRows: 8 }}
          styles={{
            textarea: { padding: '0px', resize: 'none' },
          }}
        />
      </div>
      {showAttachButton && (
        <button
          onClick={onAttachClick}
          className="cursor-pointer hover:text-bg-user pb-1"
        >
          <AtIcon className="h-4 w-4" />
        </button>
      )}

      <button
        onClick={onSend}
        className={`cursor-pointer ${isButtonActive ? 'text-bg-user' : 'text-text-grayLight'} flex pb-1`}
      >
        {editMode ? (
          <CheckCircleOutlined className="text-blue-500 text-xl h-4 w-4" />
        ) : (
          <SendIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
