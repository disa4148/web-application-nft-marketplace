'use client';
import React, { useEffect, useState } from 'react';
import SenderCard from './_components/senderCard/senderCard';
import Support from './_components/support/Support';
import Page from '@/shared/containers/page';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import css from './messenger.module.scss';
import { getChats } from './axios/axios';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

interface ChatMessage {
  _id: string;
  from: string;
  chatId: string;
  text: string;
  read: boolean;
  __v: number;
}

type Props = {
  children: React.ReactNode;
};

export default function MessengerSlice({ children }: Props): JSX.Element {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatData = await getChats();
        setChats(chatData);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, []);

  const updateLastMessage = (message: any) => {
    console.log('ласт:', message);
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === message.chatId ? { ...chat, lastMessage: message } : chat,
      ),
    );
  };

  const handleSetActiveChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  return (
    <Page padding>
      <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
        <div className={css.chats}>
          <Link href={'https://t.me/nft_support_238'}>
            <Support />
          </Link>
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            chats.map((item: any, index: number) =>
              item.owner ? (
                <SenderCard
                  key={index}
                  name={item.owner.name}
                  emoji={item.owner.emoji}
                  lastMessage={item.lastMessage.text}
                  idChat={item.lastMessage.chatId}
                  isActive={item.lastMessage.chatId === activeChatId}
                  onClick={() => handleSetActiveChat(item.lastMessage.chatId)}
                />
              ) : (
                ''
              ),
            )
          )}
        </div>
        <div className={css.dialogues}>{children}</div>
      </div>
    </Page>
  );
}
