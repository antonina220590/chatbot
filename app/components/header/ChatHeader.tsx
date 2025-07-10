'use client';

import Image from 'next/image';
import MoreIcon from '../icons/MoreIcon';
import { Dropdown, MenuProps, Space } from 'antd';
import useMessageStore from '@/app/stores/useMessageStore';
import { DeleteOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useThemeStore } from '@/app/stores/useThemeStore';

export default function ChatHeader() {
  const clearChat = useMessageStore((state) => state.clearChat);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span className="flex justify-center font-body text-lg">Settings</span>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: <a onClick={clearChat}>Clear chat</a>,
      icon: <DeleteOutlined />,
    },
    {
      key: '3',
      label: <a onClick={toggleTheme}>Change theme</a>,
      icon: theme === 'light' ? <MoonOutlined /> : <SunOutlined />,
    },
  ];

  return (
    <header className="pt-[17px] pb-[15px] pl-[13px] pr-[24px] border-b border-gray-300 dark:border-b-[0.1px] dark:border-gray-500 bg-bg-chat">
      <div className="flex items-center gap-2 xs:flex-row xs:justify-between flex-col-reverse">
        <Image
          priority={true}
          src="/avatar.png"
          alt="group avatar"
          width={84}
          height={26}
          quality={100}
        />
        <div className="flex flex-col">
          <p className="font-body font-semibold text-[12px] sm:text-[14px] text-text-dark w-full tracking-wide">
            <span>🦄</span> Team Unicorns
          </p>
          <p className="font-body font-normal text-[10px] sm:text-[12px] text-text-gray">
            last seen 45 minutes ago
          </p>
        </div>

        <Dropdown menu={{ items }} placement="bottomRight" arrow={false}>
          <Space>
            <MoreIcon />
          </Space>
        </Dropdown>
      </div>
    </header>
  );
}
