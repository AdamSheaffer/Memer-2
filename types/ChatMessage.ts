import { Timestamp } from "./Firebase";

export type ChatMessageType = "text" | "emoji";

export interface ChatMessage {
  uid?: string;
  type: ChatMessageType;
  content: string;
  userId: string;
  username: string;
  photoURL: string;
  timeStamp: Timestamp;
}

export interface BeautifulChatMessage {
  id?: string;
  type: ChatMessageType;
  author: string;
  data: {
    [K in ChatMessageType]?: string;
  };
  meta: Timestamp;
}
