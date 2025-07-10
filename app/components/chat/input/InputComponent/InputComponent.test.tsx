import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach, type Mock } from 'vitest';
import React from 'react';
import type { TextAreaRef } from 'antd/es/input/TextArea';

import InputComponent from './InputComponent';
import useInputStore from '@/app/stores/useInputStore';
import useMessageStore, { Message } from '@/app/stores/useMessageStore';
import { processImageFile } from '@/app/utils/processImage';

interface MockMessageInputCoreProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttachClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
}

const MockMessageInputCore = React.forwardRef(
  (props: MockMessageInputCoreProps, _ref: React.ForwardedRef<TextAreaRef>) => (
    <div data-testid="message-input-core">
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={props.onKeyDown}
        data-testid="message-input"
      />
      <button onClick={props.onSend} data-testid="send-button" />
      <button onClick={props.onAttachClick} data-testid="attach-button" />
    </div>
  )
);
MockMessageInputCore.displayName = 'MockMessageInputCore';

vi.mock('./MessageInputCore', () => ({
  default: MockMessageInputCore,
}));

vi.mock('@/app/stores/useInputStore');
vi.mock('@/app/stores/useMessageStore');
vi.mock('@/app/utils/processImage');

const mockNotificationError = vi.fn();
vi.mock('antd', async (importOriginal) => {
  const antd = await importOriginal<typeof import('antd')>();
  return {
    ...antd,
    notification: {
      useNotification: () => [
        { error: mockNotificationError },
        <div key="1" />,
      ],
    },
  };
});

describe('InputComponent', () => {
  const mockSetInputValue = vi.fn();
  const mockAddMessage = vi.fn();
  const mockSubmitEditMessage = vi.fn();
  const mockCancelEditMessage = vi.fn();
  const mockSetPreviewImage = vi.fn();
  const mockOpenAttachmentModal = vi.fn();

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
      openAttachmentModal: mockOpenAttachmentModal,
      setPreviewImage: mockSetPreviewImage,
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
    mockNotificationError.mockClear();
  });

  it('should call addMessage and clear input when sending a new message', async () => {
    const user = userEvent.setup();
    setupMocks({ inputValue: 'New message' });
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

  it('should call cancelEditMessage on Escape key press in edit mode', async () => {
    const user = userEvent.setup();
    setupMocks({ editingMessageId: 'msg-to-edit-1' });
    render(<InputComponent />);
    await user.keyboard('{Escape}');
    expect(mockCancelEditMessage).toHaveBeenCalledTimes(1);
    expect(mockSetInputValue).toHaveBeenCalledWith('');
  });

  it('should handle file attachment correctly', async () => {
    const user = userEvent.setup();
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    const fakeImageData = {
      url: 'data:image/png;base64,aGVsbG8=',
      width: 100,
      height: 100,
    };
    (processImageFile as Mock).mockResolvedValue(fakeImageData);

    setupMocks({ inputValue: 'Text before attaching' });
    render(<InputComponent />);

    const fileInput = screen.getByTestId('input-file');

    await user.upload(fileInput, fakeFile);

    await waitFor(() => {
      expect(mockNotificationError).not.toHaveBeenCalled();
      expect(mockSetPreviewImage).toHaveBeenCalledWith(fakeImageData);
      expect(mockOpenAttachmentModal).toHaveBeenCalledWith(
        'Text before attaching'
      );
    });
  });

  it('should not call addMessage if input is empty', async () => {
    const user = userEvent.setup();
    setupMocks({ inputValue: '   ' });
    render(<InputComponent />);
    const sendButton = screen.getByRole('button', { name: /send message/i });
    await user.click(sendButton);
    expect(mockAddMessage).not.toHaveBeenCalled();
  });

  it('should populate input with message text when entering edit mode', () => {
    const messageToEdit = {
      id: 'msg-1',
      text: 'Original Text',
      sender: 'user' as const,
      timestamp: Date.now(),
    };
    setupMocks({ editingMessageId: null, messages: [messageToEdit] });
    const { rerender } = render(<InputComponent />);
    setupMocks({ editingMessageId: 'msg-1', messages: [messageToEdit] });
    rerender(<InputComponent />);
    expect(mockSetInputValue).toHaveBeenCalledWith('Original Text');
  });
});
