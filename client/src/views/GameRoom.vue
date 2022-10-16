<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Modal from "../components/base/Modal.vue";
import GameArea from "../components/GameArea.vue";
import PlayersSidebar from "../components/PlayersSidebar.vue";
import ProfileCreate from "../components/ProfileCreate.vue";
import { useAvatar } from "../composables/useAvatar";
import { useGame } from "../composables/useGame";
import { useUser } from "../composables/useUser";
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
  <div class="h-full">
    <div v-if="game?.uid" class="h-full">
      <Modal v-if="showAvatarCreator">
        <ProfileCreate :game-id="game?.uid" @submit="onAvatarChange" />
      </Modal>

      <div class="flex h-full">
        <div>
          <PlayersSidebar :game-id="game.uid" />
        </div>
        <div class="flex-1">
          <GameArea :game-id="game.uid" />
        </div>
      </div>
    </div>
  </div>
</template>
