import useMessageStore from '@/app/stores/useMessageStore';
import MessageInputCore from './MessageInputCore';
import useInputStore from '@/app/stores/useInputStore';

export default function InputComponent() {
  const { inputValue, setInputValue } = useInputStore();
  const { addMessage } = useMessageStore();

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleSendMessage = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') return;
    if (trimmedValue) {
      addMessage(trimmedValue);
    }
    setInputValue('');
  };

  return (
    <MessageInputCore
      value={inputValue}
      onChange={handleChange}
      onSend={handleSendMessage}
    />
  );
}
