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
            <h2 class="has-text-white has-text-centered is-size-3">
              {{submission.top && submission.top.toUpperCase()}}
            </h2>
            <b-image :src="submission.photoURL"/>
            <h2 class="has-text-white has-text-centered is-size-3">
              {{submission.bottom && submission.bottom.toUpperCase()}}
            </h2>
          </div>
        </b-carousel-item>
      </b-carousel>
    </modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';
import { Meme } from '@/types/Meme';

@Component({
  components: { Modal },
})
export default class SubmissionSlideshow extends Vue {
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
}
</script>

<style scoped>
</style>
