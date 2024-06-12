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
  const { data, isLoading } = useGetMessagesQuery({ chatid: params.chat }, {skip: true});
  const t = useTranslations('messenger.chat');
  const [messages, setMessages] = useState<ChatMessage[]>(data);
  const [inputValue, setInputValue] = useState<string>('');
  const URL = 'http://107.23.115.186:3000';
  const token = getAccessToken();
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const newSocket = io(URL, {
      auth: {
        token: `Bearer ${token}`,
      },
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    setSocket(newSocket);

    newSocket.on('message.created', (message: any) => {
      console.log('Received new message:', message);
      setMessages((prevMessages): any => [...prevMessages, message.data]); // Добавляем новое сообщение в состояние
    });
  }, []);
  const [sendMess] = useSendMessageMutation();

  const SendMessage = async () => {
    const data = {
      text: inputValue,
      ownerId: '66442a08ef9dd53a7a4ff180',
    };
    const res = await sendMess(data);

    console.log(res);
    setInputValue('');
  };

  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-100')}>
      <div className={css.messages}>
        {!isLoading && messages && messages.length > 0 ? (
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
        )}
      </div>
      <Input
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
      />
    </div>
  );
}
