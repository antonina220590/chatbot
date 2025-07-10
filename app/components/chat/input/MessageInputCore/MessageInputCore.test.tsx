import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import MessageInputCore from './MessageInputCore';

vi.mock('antd', async (importOriginal) => {
  const antd = await importOriginal<typeof import('antd')>();
  return {
    ...antd,
    Popover: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('MessageInputCore Component', () => {
  const mockOnChange = vi.fn();
  const mockOnSend = vi.fn();
  const mockOnAttachClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the input with placeholder and initial value', () => {
    render(
      <MessageInputCore
        value="Initial text"
        onChange={mockOnChange}
        onSend={mockOnSend}
      />
    );
    const input = screen.getByDisplayValue('Initial text');
    expect(input).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument();
  });

  it('should call onChange when user types in the input', async () => {
    const user = userEvent.setup();
    render(
      <MessageInputCore value="" onChange={mockOnChange} onSend={mockOnSend} />
    );
    const input = screen.getByPlaceholderText('Start typing...');
    await user.type(input, 'Hi');
    expect(mockOnChange).toHaveBeenCalledWith('H');
    expect(mockOnChange).toHaveBeenCalledWith('i');
    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  it('should call onSend when user click the send button', async () => {
    const user = userEvent.setup();
    render(<MessageInputCore value="Initial text" onSend={mockOnSend} />);
    const sendButton = screen.getByRole('button', { name: /send message/i });
    await user.type(sendButton, 'click');
    expect(mockOnSend).toHaveBeenCalledTimes(1);
  });

  it('should call onEdit when user click the attach button', async () => {
    const user = userEvent.setup();
    render(
      <MessageInputCore
        value="Initial text"
        onAttachClick={mockOnAttachClick}
      />
    );
    const attachButton = screen.getByRole('button', { name: /attach image/i });
    await user.type(attachButton, 'click');
    expect(mockOnAttachClick).toHaveBeenCalledTimes(1);
  });

  it('should show check icon in editMode', () => {
    render(<MessageInputCore editMode={true} />);
    expect(
      screen.getByRole('img', { name: /check-circle/i })
    ).toBeInTheDocument();
  });
});
