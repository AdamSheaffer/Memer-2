<template>
  <div class="template-builder">
    <modal v-if="isPicking">
      <b-tabs v-model="step">
        <b-tab-item>
          <h2 class="header is-size-2">CATEGORY</h2>
          <span class="subheader is-size-7">PICK A CATEGORY FOR YOUR MEME</span>
          <ul class="options my-5">
            <li
              v-for="option in categoryOptions"
              :key="option"
              @click="selectedCategory = option"
              class="option"
              :class="{ active: selectedCategory === option }">
              {{ option.toUpperCase() }}
            </li>
          </ul>
          <div class="mt-6 mb-3 is-flex is-justify-content-flex-end">
            <b-button @click="categorySelect" class="btn" type="is-info">NEXT</b-button>
          </div>
        </b-tab-item>
        <b-tab-item>
          <h2 class="header is-size-2 has-text-centered">CHOOSE YOUR GIF</h2>
          <div v-for="(option, i) in gifOptions" :key="option" class="mt-5">
            <img @click="gifSelect" v-show="i === gifIndex" :src="option" class="gif" />
          </div>
          <div class="is-flex is-justify-content-space-around mt-3">
            <div @click="prevGif" class="arrow">
              <b-icon  size="is-large" icon="arrow-circle-left" type="is-success"/>
            </div>
            <div @click="nextGif" class="arrow">
              <b-icon size="is-large" icon="arrow-circle-right" type="is-success"/>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </modal>
    <div v-else>
      <modal :dark="true">
        <h2 class="has-text-warning is-size-2">{{namePossessive}} TURN</h2>
        <span class="subheader subheader--dark is-size-7">
          {{ turnUsername.toUpperCase() }} IS PICKING A CATEGORY FROM...
        </span>
        <ul class="options my-5">
          <li
            v-for="option in categoryOptions"
            :key="option"
            class="option option--disabled">
            {{ option.toUpperCase() }}
          </li>
        </ul>
      </modal>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Emit,
} from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';

enum ModalStep {
  Category = 0,
  Gif
}

@Component({
  components: { Modal },
})
export default class TemplateBuilder extends Vue {
  @Prop({ required: true }) categoryOptions!: string[]

  @Prop({ required: false, default: [] }) gifOptions!: string[]

  @Prop({ required: true }) isPicking!: boolean

  @Prop({ required: true, default: '' }) turnUsername!: string

  step: ModalStep = ModalStep.Category

  selectedCategory: string | null = null

  selectedGif: string | null = null

  gifIndex = 0

  get namePossessive() : string {
    return this.turnUsername.toUpperCase().endsWith('S')
      ? `${this.turnUsername.toUpperCase()}'`
      : `${this.turnUsername.toUpperCase()}'S`;
  }

  mounted(): void {
    const [defaultOption] = this.categoryOptions;
    this.selectedCategory = defaultOption;
  }

  nextGif(): void {
    if (this.gifIndex === this.gifOptions.length - 1) {
      this.gifIndex = 0;
    } else {
      this.gifIndex += 1;
    }
  }

  prevGif(): void {
    if (this.gifIndex === 0) {
      this.gifIndex = this.gifOptions.length - 1;
    } else {
      this.gifIndex -= 1;
    }
  }

  categorySelect(): void {
    if (!this.selectedCategory) return;

    this.step = ModalStep.Gif;
    this.$emit('category-select', this.selectedCategory);
  }

  @Emit()
  gifSelect(): string {
    if (!this.isPicking) {
      throw Error('Player cannot pick until their turn');
    }
    return this.gifOptions[this.gifIndex];
  }
}

</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.header {
  @include impact-text;
  color: $purple-1;
  line-height: 2.5rem;
}

.subheader {
  color: $purple-2;
  font-family: $family-2;

  &--dark {
    color: $white;
  }
}

.options {

  .option {
    @include impact-text;
    text-shadow: none;
    cursor: pointer;
    -webkit-transition: all .1s ease-out;
    -moz-transition: all .1s ease-out;
    -o-transition: all .1s ease-out;
    transition: all .1s ease-out;
    color: $primary;
    font-size: 1.4rem;
    margin: 3px 0;

    &--disabled {
      cursor: inherit;
    }

    &.active {
      font-size: 2rem;
      color: $yellow;
      @include stroke(1, $primary);
    }

  }
}

.btn{
  min-width: 90px;
}

.arrow, .gif {
  cursor: pointer;
}

.gif {
  margin: 0 auto;
  display: block;
  border: 3px solid transparent;
  &:hover {
    transition: border .2s linear;
    border: 3px solid $success;
  }
}

::v-deep nav.tabs {
  display: none;
}
</style>
