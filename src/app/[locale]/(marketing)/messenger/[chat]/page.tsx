'use client';
import React, { useState, useEffect } from 'react';
import css from './page.module.scss';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import Message from '../_components/dialogue/message/message';
import { useTranslations } from 'next-intl';
import io, { Socket } from 'socket.io-client';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '@/shared/redux/features/messangerApi';
import { getAccessToken } from '@/shared/lib/cookie';
import { socket } from '@/socket';

interface Message {
  id: number;
  text: string;
  isMine: boolean;
  read: boolean;
}
interface ChatMessage {
  _id: string;
  from: string;
  chatId: string;
  text: string;
  read: boolean;
  __v: number;
}

export default function Chat({
  params,
}: {
  params: { chat: string };
}): JSX.Element {
  const { data } = useGetMessagesQuery({ chatid: params.chat });
  console.log(data);

  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-100')}>
      <div className={css.messages}>
        {/* {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <Message
              key={index}
              isMine={true}
              text={message.text}
              id={message._id}
            />
          ))
        ) : (
          <p>Loading...</p>
        )} */}
      </div>
      {/* <Input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (inputValue.trim() !== '') {
              SendMessage();
            }
          }
        }}
        className={css.inputMessage}
        placeholder={t('inputPlaceholder')}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      /> */}
    </div>
  );
}
