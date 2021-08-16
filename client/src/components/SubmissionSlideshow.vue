<template>
  <div class="slideshow">
    <modal :blur="true" :dark="true">
      <b-carousel
        v-model="activeIndex"
        :autoplay="false"
        :arrow="false"
        :indicator="false">
        <b-carousel-item v-for="(submission, i) in submissions" :key="i">
          <div>
            <h2 class="has-text-white has-text-centered" :class="headerClass">
              {{submission.top && submission.top.toUpperCase()}}
            </h2>
            <b-image :src="submission.photoURL"/>
            <h2 class="has-text-white has-text-centered" :class="headerClass">
              {{submission.bottom && submission.bottom.toUpperCase()}}
            </h2>
          </div>
        </b-carousel-item>
      </b-carousel>
    </modal>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Mixins, Watch,
} from 'vue-property-decorator';
import MemeTextMixin from '@/mixins/MemeTextMixin';
import Modal from '@/components/Modal.vue';
import { Meme } from '@/types/Meme';

@Component({
  components: { Modal },
})
export default class SubmissionSlideshow extends Mixins(MemeTextMixin) {
  @Prop({ required: true }) submissions!: Meme[]

  timer = 7000; // how long to display each submission

  activeIndex = 0;

  timerId!: number;

  mounted(): void {
    this.timerId = setInterval(() => {
      if (this.isShowingLastSubmission) {
        this.$emit('finished');
        clearInterval(this.timerId);
      } else {
        this.activeIndex += 1;
      }
    }, this.timer);
  }

  destroyed(): void {
    clearInterval(this.timerId);
  }

  get isShowingLastSubmission(): boolean {
    return this.submissions.length === this.activeIndex + 1;
  }

  @Watch('activeIndex', { immediate: true })
  onActiveIndexChange(): void {
    const meme = this.submissions[this.activeIndex];
    this.setHeaderSize(meme);
  }
}
</script>

<style scoped>
</style>
