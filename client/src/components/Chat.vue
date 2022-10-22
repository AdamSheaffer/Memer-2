<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { BeautifulChatMessage } from "../../../types";
import { useChat } from "../composables/useChat";
import { useGame } from "../composables/useGame";
import { useUser } from "../composables/useUser";

const props = defineProps<{ gameId: string }>();

const { players } = useGame(props.gameId);
const { messages, sendMessage, isChatOpen, unreadMessageCount, openChat, closeChat } = useChat(
  props.gameId
);
const { user } = useUser();

const colors = {
  header: {
    bg: "#9b59b6",
    text: "#cbd5e1",
  },
  launcher: {
    bg: "#1abb9b",
  },
  messageList: {
    bg: "#cbd5e1",
  },
  sentMessage: {
    bg: "#9b59b6",
    text: "#fcfcfc",
  },
  receivedMessage: {
    bg: "#6b7280",
    text: "#fcfcfc",
  },
  userInput: {
    bg: "#f4f7f9",
    text: "#565867",
  },
};

const participants = computed(() => {
  return players.value
    .filter((p) => p.uid !== user.value?.uid)
    .map((p) => ({
      id: p.uid,
      name: p.username,
      imageUrl: p.photoURL,
    }));
});

const onMessageSend = (message: BeautifulChatMessage) => {
  return sendMessage({
    userId: user.value!.uid,
    username: user.value!.username ?? "",
    photoURL: user.value!.photoURL ?? "",
    content: message.data[message.type] ?? "",
    type: message.type,
  });
};

const beautifulChatMessage = computed<BeautifulChatMessage[]>(() => {
  return messages.value.map((message) => ({
    id: message.uid,
    type: message.type,
    author: message.userId === user.value?.uid ? "me" : message.userId,
    data: { [message.type]: message.content },
    meta: message.timeStamp,
  }));
});
</script>

<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :on-message-was-sent="onMessageSend"
      :message-list="beautifulChatMessage"
      :new-messages-count="unreadMessageCount"
      :is-open="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :show-emoji="true"
      :show-launcher="true"
      :show-close-button="true"
      :colors="colors"
      :always-scroll-to-bottom="true"
      :disable-user-list-toggle="true"
      :message-styling="true"
    >
    </beautiful-chat>
  </div>
</template>

<style scoped>
:deep(.sc-chat-window.opened) {
  z-index: 100;
}
</style>
