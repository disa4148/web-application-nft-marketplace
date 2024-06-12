import { apiSlice } from '../api/apiSlice';
interface ChatMessage {
  _id: string;
  from: string;
  chatId: string;
  text: string;
  read: boolean;
  __v: number;
}
export type MessageTag = {
  type: 'Messages';
  id: string;
};
export const messangerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<any, void>({
      query: () => ({
        url: `api/chat`,
        method: 'GET',
      }),
      providesTags: ['Chats'], 
    }),
    getMessages: builder.query<any, { chatid: string }>({
      query: ({ chatid }) => ({
        url: `api/message/${chatid}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Messages', id: arg.chatid }],

    }),
    sendMessage: builder.mutation<ChatMessage,{ ownerId: string; text: string }>({
      query: (data) => ({
        url: `api/message`,
        body: {
          text: data.text,
          ownerId: data.ownerId,
        },
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Messages', id: arg.ownerId }, // Обновляем кеш сообщений для этого чата
        'Chats' // Обновляем список чатов
      ],
    }),
  }),
});

export const { useGetChatsQuery, useGetMessagesQuery, useSendMessageMutation } =
  messangerApi;
