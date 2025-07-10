import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import dayjs from 'dayjs';

import { Message } from '@/app/stores/useMessageStore';
import BotMessage from './BotMessage';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt ?? ''} />;
  },
}));

describe('BotMessage Component', () => {
  const mockMessage: Message = {
    id: 'bot-msg-1',
    sender: 'bot',
    text: 'Hello World!',
    timestamp: 1672531200000,
  };

  it('should render bot name, message text, avatar and formatted timestamp', () => {
    render(<BotMessage message={mockMessage} />);

    const botName = screen.getByText('Janet');
    const messageText = screen.getByText('Hello World!');
    const avatar = screen.getByAltText('bot avatar');
    const timestampText = screen.getByText(
      dayjs(mockMessage.timestamp).format('h:mm A')
    );

    expect(botName).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(timestampText).toBeInTheDocument();
  });
});
