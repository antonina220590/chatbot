import emojis from './emoji';

interface EmojiContentProps {
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiContent({ onEmojiSelect }: EmojiContentProps) {
  return (
    <div className="grid grid-cols-8 gap-2 p-2 bg-bg-primary">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          className="text-2xl hover:bg-gray-200 rounded p-1 cursor-pointer"
          onClick={() => onEmojiSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
