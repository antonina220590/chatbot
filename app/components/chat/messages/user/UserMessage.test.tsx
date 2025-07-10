import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import React from 'react';

import UserMessage from './UserMessage';
import { Message } from '@/app/stores/useMessageStore';
import dayjs from 'dayjs';

const { mockDeleteMessage, mockStartEditMessage, mockOpenImageViewer } =
  vi.hoisted(() => {
    return {
      mockDeleteMessage: vi.fn(),
      mockStartEditMessage: vi.fn(),
      mockOpenImageViewer: vi.fn(),
    };
  });

vi.mock('@/app/stores/useMessageStore', () => ({
  default: vi.fn((selector) => {
    if (selector.toString().includes('deleteMessage')) {
      return mockDeleteMessage;
    }
    if (selector.toString().includes('startEditMessage')) {
      return mockStartEditMessage;
    }
    return [];
  }),
}));

vi.mock('@/app/stores/useImageViewerStore', () => ({
  default: vi.fn().mockReturnValue(mockOpenImageViewer),
}));

vi.mock('@/app/components/icons/UserBubble', () => ({
  default: () => <div data-testid="user-bubble" />,
}));

describe('UserMessage Component', () => {
  const mockMessage: Message = {
    id: 'user-msg-1',
    sender: 'user',
    text: 'Test Message',
    timestamp: 1672531200000,
  };

  const mockMessageWithImage: Message = {
    id: 'user-msg-2',
    sender: 'user',
    text: 'Check the image',
    timestamp: 1672531200001,
    imageUrl: '/test-image.jpg',
    width: 800,
    height: 600,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render message text and formatted timestamp', () => {
    render(<UserMessage message={mockMessage} />);

    const messageText = screen.getByText('Test Message');
    const timestampText = screen.getByText(
      dayjs(mockMessage.timestamp).format('h:mm A')
    );
    expect(messageText).toBeInTheDocument();
    expect(timestampText).toBeInTheDocument();
  });

  it('should call deleteMessage with the correct id when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserMessage message={mockMessage} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    expect(mockDeleteMessage).toHaveBeenCalled();
    expect(mockDeleteMessage).toHaveBeenCalledWith('user-msg-1');
  });

  it('should call editMessage with the correct id when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<UserMessage message={mockMessage} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);
    expect(mockStartEditMessage).toHaveBeenCalled();
  });

  it('should render call openImageViewer with correct data when image is clicked', async () => {
    const user = userEvent.setup();
    render(<UserMessage message={mockMessageWithImage} />);
    const image = screen.getByAltText('Check the image');
    await user.click(image);

    expect(mockOpenImageViewer).toHaveBeenCalledWith({
      url: '/test-image.jpg',
      width: 800,
      height: 600,
    });
  });

  it('should render UserBubble when message is not consecutive', () => {
    render(<UserMessage message={mockMessage} isConsecutive={false} />);
    expect(screen.getByTestId('user-bubble')).toBeInTheDocument();
  });

  it('should NOT render UserBubble when message is consecutive', () => {
    render(<UserMessage message={mockMessage} isConsecutive={true} />);
    expect(screen.queryByTestId('user-bubble')).not.toBeInTheDocument();
  });
});
