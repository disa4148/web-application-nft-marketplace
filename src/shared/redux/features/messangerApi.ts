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
  type: 'Messages'; // Используйте строковый литерал здесь
  id: string;
};
export const messangerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<any, void>({
      query: () => ({
        url: `api/chat`,
        method: 'GET',
      }),
    }),
    getMessages: builder.query<any, { chatid: string }>({
      query: ({ chatid }) => ({
        url: `api/message/${chatid}`,
        method: 'GET',
      }),
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
    }),
  }),
});

export const { useGetChatsQuery, useGetMessagesQuery, useSendMessageMutation } =
  messangerApi;
