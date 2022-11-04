<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Maybe, Player } from "../../../types";
import { useAvatar } from "../composables/useAvatar";
import { useGame } from "../composables/useGame";
import { backArrow, check, gavel, heart, thumbsDown, users, xMark } from "../services/icons";
import { negativeSound } from "../services/sounds";
import MemerButton from "./base/MemerButton.vue";
import Modal from "./base/Modal.vue";
import ProfileCreate from "./ProfileCreate.vue";

const props = defineProps<{ gameId: string }>();

const { activePlayers, game, currentPlayer, updatePlayer, userIsHost } = useGame(props.gameId);
const router = useRouter();

const isOpen = ref(false);

onKeyStroke("Escape", () => {
  isOpen.value = false;
  playerToRemove.value = null;
  showAvatarModal.value = false;
});

const leaveGame = () => {
  negativeSound.play();
  router.push("/open-games");
  return updatePlayer(currentPlayer.value!.uid, { isActive: false });
};

const showRemoveButtonForUserId = ref<Maybe<string>>(null);
const playerToRemove = ref<Maybe<Player>>(null);

const onPlayerHover = (playerId: Maybe<string>) => {
  if (userIsHost.value) {
    showRemoveButtonForUserId.value = playerId;
  }
};

const removePlayer = async () => {
  if (!playerToRemove.value || !userIsHost.value) {
    return;
  }

  await updatePlayer(playerToRemove.value.uid, { isActive: false, removed: true });

  playerToRemove.value = null;
};

const showAvatarModal = ref(false);
const { avatar, photoURL: avatarPhotoURL } = useAvatar();

const onProfileClick = (player: Player) => {
  if (player.uid !== currentPlayer.value?.uid) {
    return;
  }

  showAvatarModal.value = true;
};

const onAvatarChange = async () => {
  await updatePlayer(currentPlayer.value!.uid, {
    username: avatar.name,
    photoURL: avatarPhotoURL.value,
  });
  showAvatarModal.value = false;
};
</script>

<template>
  <button
    class="z-10 md:hidden absolute top-4 left-4 rounded-full bg-purple-400"
    title="SHOW PLAYERS"
    @click="isOpen = true"
  >
    <FaIcon :icon="users" class="text-xl p-4 text-white"></FaIcon>
  </button>
  <aside
    :class="{
      '-translate-x-full': !isOpen,
      'translate-x-0 z-10': isOpen,
    }"
    class="overflow-hidden md:translate-x-0 md:relative md:z-0 w-full md:w-72 absolute flex flex-col justify-between bg-darkblue-500 h-full py-2 transition duration-300"
  >
    <div class="flex flex-col space-y-2">
      <h1 class="text-purple-400 text-6xl text-shadow-lg mb-4 mt-2 px-4">MEMER</h1>

      <button class="absolute top-1 right-3 md:hidden">
        <FaIcon
          :icon="xMark"
          class="text-xl text-slate-400 hover:scale-x-105 hover:text-slate-200 transition-all"
          title="CLOSE"
          @click="isOpen = false"
        ></FaIcon>
      </button>

      <div
        v-for="player in activePlayers"
        :key="player.uid"
        class="px-4 py-2"
        :class="{ 'hover:bg-slate-700': userIsHost }"
        @mouseenter="onPlayerHover(player.uid)"
        @mouseleave="onPlayerHover(null)"
      >
        <div class="flex space-x-4">
          <img
            :src="player.photoURL!"
            :alt="`${player.username} Avatar`"
            class="rounded-full border-2 border-gold-500 w-12"
            :class="{
              'bg-teal-500': currentPlayer?.uid !== player.uid,
              'bg-purple-400 cursor-pointer hover:scale-105 hover:shadow-2xl':
                currentPlayer?.uid === player.uid,
            }"
            :title="currentPlayer?.uid === player.uid ? 'UPDATE AVATAR' : ''"
            @click="onProfileClick(player)"
          />
          <div class="flex flex-col">
            <div class="flex">
              <p class="text-slate-300 font-['Antonio']">
                {{ player.username }}
                <FaIcon
                  v-if="!!player.memePlayed"
                  :icon="check"
                  class="text-teal-400"
                  title="MEME SUBMITTED"
                ></FaIcon>
              </p>
              <div v-if="game?.turn === player.uid" class="ml-2" title="ROUND JUDGE">
                <FaIcon :icon="gavel" class="text-gold-400"></FaIcon>
              </div>
            </div>
            <div class="flex space-x-0.5">
              <FaIcon
                v-for="point in game?.pointsToWin"
                :key="point"
                :icon="heart"
                :class="player.score >= point ? 'text-red-500' : 'text-slate-300'"
              ></FaIcon>
            </div>
          </div>

          <div
            v-if="
              userIsHost &&
              player.uid !== currentPlayer?.uid &&
              showRemoveButtonForUserId === player.uid
            "
            class="self-center flex-1"
          >
            <div class="text-right">
              <FaIcon
                :icon="thumbsDown"
                class="cursor-pointer text-red-500 hover:text-red-600 text-xl"
                title="REMOVE PLAYER"
                @click="playerToRemove = player"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mb-6 text-slate-400 hover:text-slate-200 transition-colors text-center font-['Antonio'] text-lg"
    >
      <button class="tracking-wide" @click="leaveGame">
        <FaIcon :icon="backArrow"></FaIcon>
        LEAVE GAME
      </button>
    </div>
  </aside>
  <Modal v-if="playerToRemove">
    <div class="p-8 text-center">
      <h2 class="text-slate-200 text-3xl text-shadow-purple">
        REMOVE {{ playerToRemove.username }}
      </h2>
      <h4 class="text-gold-500 font-['Antonio'] mb-8 tracking-wide">
        THIS WILL KICK THE PLAYER FROM THE GAME. ARE YOU SURE?
      </h4>
      <div class="flex space-x-2">
        <MemerButton
          outline
          class="flex-1"
          @click="playerToRemove = null"
          @keydown.esc="playerToRemove = null"
          tabindex="0"
          >CANCEL</MemerButton
        >
        <MemerButton class="flex-1" @click="removePlayer">REMOVE</MemerButton>
      </div>
    </div>
  </Modal>

  <Modal v-if="showAvatarModal">
    <button class="absolute top-10 right-12">
      <FaIcon
        :icon="xMark"
        class="text-xl text-slate-400 hover:scale-x-105 hover:text-slate-200 transition-all"
        title="CLOSE"
        @click="showAvatarModal = false"
      ></FaIcon>
    </button>
    <ProfileCreate @submit="onAvatarChange" />
  </Modal>
</template>
