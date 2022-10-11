<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Modal from "../components/base/Modal.vue";
import GameArea from "../components/GameArea.vue";
import PlayersSidebar from "../components/PlayersSidebar.vue";
import ProfileCreate from "../components/ProfileCreate.vue";
import { useAvatar } from "../composeables/useAvatar";
import { useGame } from "../composeables/useGame";
import { useUser } from "../composeables/useUser";
import { joinGame } from "../services/gameService";

const gameId = useRoute().params.id as string;
const { user } = useUser();
const { needsAvatarSet, markAvatarAsSet } = useAvatar();
const showAvatarCreator = ref(Boolean(needsAvatarSet.value));
const { game, initialize, updatePlayer } = useGame(gameId);

const onAvatarChange = async () => {
  await updatePlayer(user.value!.uid, {
    username: user.value!.username,
    photoURL: user.value!.photoURL,
  });
  showAvatarCreator.value = false;
  markAvatarAsSet();
};

onMounted(() => joinGame(gameId, user.value!).then(initialize));
</script>

<template>
  <div>
    <div v-if="game?.uid">
      <Modal v-if="showAvatarCreator">
        <ProfileCreate :game-id="game?.uid" @submit="onAvatarChange" />
      </Modal>

      <div class="flex">
        <div class="flex-initial w-72">
          <PlayersSidebar :game-id="game.uid" />
        </div>
        <div class="flex-1">
          <GameArea :game-id="game.uid" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
