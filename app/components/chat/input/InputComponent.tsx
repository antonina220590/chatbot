import MessageInputCore from './MessageInputCore';
import useInputStore from '@/app/stores/useInputStore';

export default function InputComponent() {
  const { inputValue, setInputValue } = useInputStore();

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return <MessageInputCore value={inputValue} onChange={handleChange} />;
}
