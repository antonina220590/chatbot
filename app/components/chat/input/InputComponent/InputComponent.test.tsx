import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest';
import React from 'react';

import InputComponent from './InputComponent';

import useInputStore from '@/app/stores/useInputStore';
import useMessageStore, { Message } from '@/app/stores/useMessageStore';

interface MockMessageInputCoreProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttachClick: () => void;
}

vi.mock('./MessageInputCore', () => ({
  default: (props: MockMessageInputCoreProps) => (
    <div data-testid="message-input-core">
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        data-testid="message-input"
      />
      <button onClick={props.onSend} data-testid="send-button" />
      <button onClick={props.onAttachClick} data-testid="attach-button" />
    </div>
  ),
}));

vi.mock('@/app/stores/useInputStore');
vi.mock('@/app/stores/useMessageStore');

vi.mock('antd', async (importOriginal) => {
  const antd = await importOriginal<typeof import('antd')>();
  return {
    ...antd,
    notification: {
      useNotification: () => [
        { error: vi.fn() },
        <div key="notification-context" />,
      ],
    },
  };
});

describe('InputComponent', () => {
  const mockSetInputValue = vi.fn();
  const mockAddMessage = vi.fn();
  const mockSubmitEditMessage = vi.fn();
  const mockCancelEditMessage = vi.fn();

  const setupMocks = ({
    inputValue = '',
    editingMessageId = null,
    messages = [],
  }: {
    inputValue?: string;
    editingMessageId?: string | null;
    messages?: Message[];
  } = {}) => {
    const mockInputState = {
      inputValue,
      setInputValue: mockSetInputValue,
      isAttachmentModalOpen: false,
      openAttachmentModal: vi.fn(),
      setPreviewImage: vi.fn(),
      clearInputState: vi.fn(),
      captionForModal: null,
      previewImage: null,
    };
    (useInputStore as unknown as Mock).mockImplementation((selector) =>
      selector(mockInputState)
    );

    const mockMessageState = {
      messages,
      editingMessageId,
      addMessage: mockAddMessage,
      submitEditMessage: mockSubmitEditMessage,
      cancelEditMessage: mockCancelEditMessage,
      isBotTyping: false,
    };
    (useMessageStore as unknown as Mock).mockImplementation((selector) =>
      selector(mockMessageState)
    );
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call addMessage and clear input when sending a new message', async () => {
    const user = userEvent.setup();
    setupMocks({ inputValue: 'New message', editingMessageId: null });
    render(<InputComponent />);
    const sendButton = screen.getByRole('button', { name: /send message/i });
    await user.click(sendButton);
    expect(mockAddMessage).toHaveBeenCalledWith({ text: 'New message' });
    expect(mockSetInputValue).toHaveBeenCalledWith('');
  });

  it('should call submitEditMessage when in edit mode', async () => {
    const user = userEvent.setup();
    setupMocks({
      inputValue: 'Updated text',
      editingMessageId: 'msg-to-edit-1',
    });
    render(<InputComponent />);
    const sendButton = screen.getByRole('button', { name: /send message/i });
    await user.click(sendButton);
    expect(mockSubmitEditMessage).toHaveBeenCalledWith('Updated text');
    expect(mockAddMessage).not.toHaveBeenCalled();
    expect(mockSetInputValue).toHaveBeenCalledWith('');
  });

  it('should call addMessage on Enter key press', async () => {
    const user = userEvent.setup();
    setupMocks({ inputValue: 'Message from Enter' });
    render(<InputComponent />);
    const input = screen.getByTestId('message-input');

    await user.click(input);
    await user.keyboard('{Enter}');
    expect(mockAddMessage).toHaveBeenCalledWith({ text: 'Message from Enter' });
  });
});
