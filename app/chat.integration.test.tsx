import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';

import Home from './page';
import useMessageStore from './stores/useMessageStore';
import useInputStore from './stores/useInputStore';

vi.mock('antd', async (importOriginal) => {
  const original = await importOriginal<typeof import('antd')>();
  return {
    ...original,
    notification: {
      useNotification: () => [
        {
          error: vi.fn(),
          success: vi.fn(),
          info: vi.fn(),
          warning: vi.fn(),
        },
        <></>,
      ],
    },
  };
});

vi.mock('next/dynamic', async () => {
  const inputComponentModule = await vi.importActual<
    typeof import('./components/chat/input/InputComponent/InputComponent')
  >('./components/chat/input/InputComponent/InputComponent');
  return {
    default: () => inputComponentModule.default,
  };
});

vi.mock('zustand/middleware', () => ({
  persist: (fn: (...args: unknown[]) => unknown) => fn,
}));

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt ?? ''} {...props} />
  ),
}));

describe('Chat Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useMessageStore.getState().clearChat();
    useInputStore.getState().clearInputState();
    localStorage.clear();
    vi.useRealTimers();
  });

  it('should allow a user to send a message and see it on the screen', async () => {
    const user = userEvent.setup();
    render(
      <React.Suspense fallback={<div>Loading dynamic component...</div>}>
        <Home />
      </React.Suspense>
    );

    const input = await screen.findByTestId('message-input');
    const sendButton = await screen.findByRole('button', {
      name: /send message/i,
    });

    await user.type(input, 'Hello, world!');
    await user.click(sendButton);

    const sentMessage = await screen.findByText('Hello, world!');
    expect(sentMessage).toBeInTheDocument();
  });

  it('should receive a response from the bot after sending a message', async () => {
    const user = userEvent.setup();

    render(<Home />);

    const input = await screen.findByPlaceholderText('Start typing...');
    const sendButton = await screen.findByRole('button', { name: /send/i });

    await user.type(input, 'A message for the bot');
    await user.click(sendButton);
    await screen.findByText('A message for the bot');
    const botResponse = await screen.findByText(
      'Hello World!',
      {},
      { timeout: 4000 }
    );

    expect(botResponse).toBeInTheDocument();
  });
});
