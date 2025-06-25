export default function TypingIndicator() {
  return (
    <div className="flex gap-2">
      <div className="typing-dots flex items-center gap-1 h-5">
        <span className="dot w-[3px] h-[3px] bg-text-gray rounded-full"></span>
        <span className="dot w-[3px] h-[3px] bg-text-gray rounded-full"></span>
        <span className="dot w-[3px] h-[3px] bg-text-gray rounded-full"></span>
      </div>
      <span className="text-xs text-text-gray">Janet is typing</span>
    </div>
  );
}
