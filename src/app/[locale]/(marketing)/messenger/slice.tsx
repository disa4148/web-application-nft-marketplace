'use client';
import React, { useEffect, useState } from 'react';
import SenderCard from './_components/senderCard/senderCard';
import Support from './_components/support/Support';
import Page from '@/shared/containers/page';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import css from './messenger.module.scss';
import { getAccessToken } from '@/shared/lib/cookie';
import { useGetChatsQuery } from '@/shared/redux/features/messangerApi';

type Props = {
  children: React.ReactNode;
};

export default function MessengerSlice({ children }: Props): JSX.Element {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const { data, isLoading } = useGetChatsQuery();
  console.log(data)
  const handleSetActiveChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  return (
    <Page padding>
      <div className={css.wrapper}>
        <div className={css.chats}>
          <Support />
          {/* {!isLoading ? (
            data &&
            data.map((item: any, index: number) => (
              <SenderCard
                key={index}
                name={item.owner.name}
                emoji={item.owner.emoji}
                lastMessage={item.lastMessage.text}
                idChat={item.lastMessage.chatId}
                isActive={item.lastMessage.chatId === activeChatId}
                onClick={() => handleSetActiveChat(item.lastMessage.chatId)}
              />
            ))
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )} */}
        </div>
        <div className={css.dialogues}>{children}</div>
      </div>
    </Page>
  );
}
