'use client'
import React, { useEffect, useState } from 'react';
import SenderCard from './_components/senderCard/senderCard';
import Support from './_components/support/Support';
import Page from '@/shared/containers/page';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import css from './messenger.module.scss';
import { getAccessToken } from '@/shared/lib/cookie';
import { useGetChatsQuery } from '@/shared/redux/features/messangerApi';
import { cn } from '@/shared/lib/utils';

type Props = {
  children: React.ReactNode;
};

export default function MessengerSlice({ children }: Props): JSX.Element {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  // const [data, setData] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, isLoading } = useGetChatsQuery();

  console.log(data)



  // const accessToken = getAccessToken()
  // console.log(accessToken)
 
  // useEffect(() => {
  //   fetch('https://nft.levpidoor.ru/api/chat', {
  //     headers: {
  //       "Content-Type": `application/json`,
  //       "Authorization": `Bearer ${accessToken}`
  //     },
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setData(data);
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //       setIsLoading(false);
  //     });
  // }, []);

  const handleSetActiveChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  return (
    <Page padding>
      <div className={cn(css.wrapper, 'bg-1-bg-black-90')}>
        <div className={css.chats}>
          <Support />
          {!isLoading ? (
            data &&
            data.map((item: any, index: number) => (
              <SenderCard
                key={index}
                name={item.owner.name}
                emoji={item.owner.emoji}
                lastMessage={item.lastMessage.text}
                idChat={item.chatId}
                isActive={item.chatId === activeChatId}
                onClick={() => handleSetActiveChat(item.chatId)}
              />
            ))
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}
          </div>
        <div className={css.dialogues}>{children}</div>
      </div>
    </Page>
  );
}
