<template>
  <div class="category-select">
    <modal v-if="isPicking">
      <h2 class="header is-size-2">CATEGORY</h2>
      <span class="subheader is-size-7">PICK A CATEGORY FOR YOUR MEME</span>
      <ul class="options my-5">
        <li
          v-for="option in options"
          :key="option"
          @click="selected = option"
          class="option"
          :class="{ active: selected === option }">
          {{ option.toUpperCase() }}
        </li>
      </ul>
      <div class="mt-6 mb-3 is-flex is-justify-content-flex-end">
        <b-button @click="select" class="btn" type="is-info">NEXT</b-button>
      </div>
    </modal>
    <div v-else>
      <modal :dark="true">
        <h2 class="has-text-warning is-size-2">{{namePossessive}} TURN</h2>
        <span class="subheader subheader--dark is-size-7">
          {{ turnUsername.toUpperCase() }} IS PICKING A CATEGORY FROM...
        </span>
        <ul class="options my-5">
          <li
            v-for="option in options"
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

@Component({
  components: { Modal },
})
export default class Divider extends Vue {
  @Prop({ required: true }) options!: string[]

  @Prop({ required: true }) isPicking!: boolean

  @Prop({ required: true, default: '' }) turnUsername!: string

  selected = this.options[0]

  get namePossessive() : string {
    return this.turnUsername.toUpperCase().endsWith('S')
      ? `${this.turnUsername.toUpperCase()}'`
      : `${this.turnUsername.toUpperCase()}'S`;
  }

  @Emit()
  select(): string {
    return this.selected;
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
</style>
