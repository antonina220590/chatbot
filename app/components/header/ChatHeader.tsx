'use client';

import Image from 'next/image';
import MoreIcon from '../icons/MoreIcon';
import { Dropdown, MenuProps, Space } from 'antd';
import useMessageStore from '@/app/stores/useMessageStore';
import { DeleteOutlined } from '@ant-design/icons';

export default function ChatHeader() {
  const clearChat = useMessageStore((state) => state.clearChat);

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
      label: (
        <a className="p-4" onClick={clearChat}>
          Clear chat
        </a>
      ),
      icon: <DeleteOutlined />,
    },
    {
      key: '3',
      label: 'Change theme',
      // icon: <.../>
    },
  ];
  return (
    <header className="pt-[17px] pb-[15px] pl-[13px] pr-[24px] border-b border-gray-300">
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
