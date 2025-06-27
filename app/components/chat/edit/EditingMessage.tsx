import { CloseCircleOutlined } from '@ant-design/icons';

interface EditingMessageProps {
  messageText: string;
  onCancel?: () => void;
}

export default function EditingMessage({
  messageText,
  onCancel,
}: EditingMessageProps) {
  const displayText =
    messageText.length > 50 ? `${messageText.slice(0, 50)}...` : messageText;

  return (
    <div className="flex py-2 justify-between">
      <div className="flex flex-col border-l-2 border-text-accent pl-3">
        <p className="font-body font-medium text-text-accent">Edit message</p>
        <span className="font-jost text-text-dark">{displayText}</span>
      </div>
      <button
        className="flex justify-end items-start text-text-accent cursor-pointer hover:text-red-500"
        onClick={onCancel}
      >
        <CloseCircleOutlined style={{ fontSize: '17px' }} />
      </button>
    </div>
  );
}
