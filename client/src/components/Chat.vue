<template>
  <div id="chat">
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="true"
      :disableUserListToggle="true"
      :messageStyling="true" />
  </div>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop,
} from 'vue-property-decorator';
import firebase from 'firebase/app';
import { gameRef } from '@/services/game';
import UserMixin from '@/mixins/UserMixin';
import { ChatMessage } from '@/types/ChatMessage';
import { Player } from '@/types/Player';

interface ChatParticpant {
  id: string
  name: string
  imageUrl: string
}

type MessageType = 'text' | 'emoji'

interface Message {
  id?: string
  type: MessageType,
  author: string,
  data: { [K in MessageType]?: string }
}

@Component
export default class Chat extends Mixins(UserMixin) {
  @Prop({
    required: true,
  })
  public readonly gameId!: string;

  @Prop({
    required: true,
  })
  public readonly players!: Player[];

  public loaded = false;

  public readonly chatCollectionRef = gameRef(this.gameId).collection('messages');

  public titleImageUrl = 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png';

  public messageList: Message[] = []

  public newMessagesCount = 0;

  public isChatOpen = false;

  public colors = {
    header: {
      bg: '#9b59b6',
      text: '#ffffff',
    },
    launcher: {
      bg: '#1abb9b',
    },
    messageList: {
      bg: '#ffffff',
    },
    sentMessage: {
      bg: '#9b59b6',
      text: '#ffffff',
    },
    receivedMessage: {
      bg: '#eaeaea',
      text: '#222222',
    },
    userInput: {
      bg: '#f4f7f9',
      text: '#565867',
    },
  }

  get participants(): ChatParticpant[] {
    return this.players
      .filter((player) => player.uid !== this.user.uid)
      .map((player) => ({
        id: player.uid,
        name: player.username,
        imageUrl: player.photoURL,
      }));
  }

  mounted(): void {
    this.chatCollectionRef.orderBy('timeStamp').onSnapshot((snap) => {
      const messages: ChatMessage[] = snap.docs.map((doc) => ({
        ...doc.data() as ChatMessage,
        id: doc.id,
      }));

      this.messageList = messages.map((message) => ({
        id: message.id,
        type: message.type,
        author: message.userId === this.user.uid ? 'me' : message.userId,
        data: { text: message.content },
      }));

      if (!this.isChatOpen && this.loaded) {
        this.newMessagesCount += 1;
      }

      this.loaded = true;
    });
  }

  onMessageWasSent(message: Message): void {
    const chatMessage: ChatMessage = {
      userId: this.user.uid,
      username: this.user.username ?? '',
      photoURL: this.user.photoURL ?? '',
      content: message.data[message.type] ?? '',
      type: message.type,
      timeStamp: firebase.firestore.Timestamp.now(),
    };

    this.chatCollectionRef.add(chatMessage);
  }

  openChat(): void {
    this.isChatOpen = true;
    this.newMessagesCount = 0;
  }

  closeChat(): void {
    // called when the user clicks on the botton to close the chat
    this.isChatOpen = false;
  }
}

</script>

<style lang="scss" scoped>
@import '../styles/_variables';

::v-deep .sc-launcher {
  z-index: 1000;
}

::v-deep .sc-chat-window {
  z-index: 1000;
}

::v-deep .sent a {
  color: $white;
  text-decoration: underline;
}
</style>
