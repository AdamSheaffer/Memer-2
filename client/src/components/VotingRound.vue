<template>
  <div>
    <div class="is-flex is-justify-content-center">
      <player-card
        v-for="(card, i) in submissionCards"
        :key="i"
        :card="card"
        :clickable="isJudge"
        class="mx-1"
        :active="card === selectedCard"
        @select="select(card)">
        <b-icon
          v-if="card === selectedCard"
          icon="check"
          type="is-success"
          size="is-large" />
      </player-card>
    </div>
    <div class="is-flex is-justify-content-center mt-3">
      <meme-card
        :imageURL="photoURL"
        :top="selectedTop"
        :bottom="selectedBottom" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import MemeCard from '@/components/Meme.vue';
import PlayerCard from '@/components/PlayerCard.vue';
import { Meme } from '@/types/Meme';
import { Card } from '@/types/Card';

@Component({
  components: { MemeCard, PlayerCard },
})
export default class VotingRound extends Vue {
  @Prop({ required: true }) submissions!: Meme[]

  @Prop({ required: true }) photoURL!: string

  @Prop({ required: true }) isJudge!: boolean

  get submissionCards(): Card[] {
    return this.submissions.map((sub) => ({
      top: sub.top || '',
      bottom: sub.bottom || '',
    }));
  }

  selectedCard: Card | null = null

  select(card: Card): void {
    if (card === this.selectedCard) {
      this.$emit('select', card);
    } else {
      this.selectedCard = card;
    }
  }

  get selectedTop(): string {
    return !!this.selectedCard && !!this.selectedCard.top
      ? this.selectedCard.top.toUpperCase()
      : '';
  }

  get selectedBottom(): string {
    return !!this.selectedCard && !!this.selectedCard.bottom
      ? this.selectedCard.bottom.toUpperCase()
      : '';
  }
}
</script>

<style>

</style>
