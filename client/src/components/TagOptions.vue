<template>
  <div>
    <b-button
      v-for="option in options"
      :key="option"
      @click="select(option)"
      type="is-warning"
      class="has-text-primary">
      {{option}}
    </b-button>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Emit,
} from 'vue-property-decorator';

@Component
export default class TagOptions extends Vue {
  @Prop({ required: true }) options!: string[]

  @Prop({ required: false, default: false }) disabled!: boolean

  @Emit()
  select(selection: string): string {
    return selection;
  }
}
</script>

<style>

</style>
