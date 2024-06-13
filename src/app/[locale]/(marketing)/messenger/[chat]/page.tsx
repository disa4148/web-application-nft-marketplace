'use client';
import React, { useState, useEffect } from 'react';
import css from './page.module.scss';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import Message from '../_components/dialogue/message/message';
import { useTranslations } from 'next-intl';
import { socket } from '@/socket';
import { getMessages, sendMessage } from '../axios/axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/store';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { getTranslations } from 'next-intl/server';
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
  const t = useTranslations('messenger.chat');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [owner, setOwner] = useState<any>();

  const [inputValue, setInputValue] = useState<string>('');

  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chatData:any = await getMessages(params.chat);
        setOwner(chatData.owner)
        setMessages(chatData.messages);
        
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('message.created', (message: ChatMessage) => {
      console.log('All messages: ', messages);
      console.log('Received new message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message.created');
    };
  }, [params.chat, messages]);

  

  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      try {
        await sendMessage(owner._id, inputValue);
        setInputValue('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  return (
    <div className={cn(css.wrapper, 'bg-1-bg-black-100')}>
      <div className={css.messages}>
        {isLoading ? (
          <div className="flex items-center	justify-center  w-[100%] h-[100%]">
            <LoadingSpinner />
          </div>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <Message
              key={message._id}
              isMine={user?._id === message.from}
              ownerEmoji={owner.emoji}
              text={message.text}
              id={message._id}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-[100%] h-[100%]">
            <p>{t('empty')}</p>
          </div>
        )}
      </div>
      <Input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
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
