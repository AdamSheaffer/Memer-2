import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { ref } from "vue";
import { ChatMessage, Maybe } from "../../../types";
import { db } from "../firebase";
import { mapCollection } from "../utils/mapCollectionDocs";

const messages = ref<ChatMessage[]>([]);
const trackingGameId = ref<Maybe<string>>(null);
const unreadMessageCount = ref(0);
const isChatOpen = ref(false);

const openChat = () => {
  isChatOpen.value = true;
  resetUnreadMessageCount();
};

const closeChat = () => (isChatOpen.value = false);

const resetUnreadMessageCount = () => {
  unreadMessageCount.value = 0;
};

export const useChat = (gameId: string) => {
  let initialCheck = true;
  isChatOpen.value = false;
  const messagesCollectionRef = collection(db, "games", gameId, "messages");

  if (trackingGameId.value !== gameId) {
    messages.value = [];
    resetUnreadMessageCount();

    const messagesQuery = query(messagesCollectionRef, orderBy("timeStamp"));
    onSnapshot(messagesQuery, (snapshot) => {
      messages.value = mapCollection<ChatMessage>(snapshot);

      if (!isChatOpen.value && !initialCheck) {
        unreadMessageCount.value++;
      }

      initialCheck = false;
    });

    trackingGameId.value = gameId;
  }

  const sendMessage = (message: Omit<ChatMessage, "timeStamp">) => {
    const payload: ChatMessage = {
      ...message,
      timeStamp: Timestamp.now(),
    };
    return addDoc(messagesCollectionRef, payload);
  };

  return {
    isChatOpen,
    messages,
    resetUnreadMessageCount,
    openChat,
    closeChat,
    sendMessage,
    unreadMessageCount,
  };
};
