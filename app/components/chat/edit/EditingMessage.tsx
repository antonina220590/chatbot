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
      <div className="flex flex-col border-l-2 border-bg-user pl-3">
        <p className="font-body font-medium text-bg-user">Edit message</p>
        <span className="font-jost text-text-dark">{displayText}</span>
      </div>
      <button
        className="flex justify-end text-bg-user cursor-pointer hover:text-red-500"
        onClick={onCancel}
      >
        <CloseCircleOutlined style={{ fontSize: '20px' }} />
      </button>
    </div>
  );
}
