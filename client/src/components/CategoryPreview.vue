<template>
  <div class="category-preview">
    <h2 class="has-text-centered is-size-2 has-text-warning mt-3">
      {{ turnUsername.toUpperCase() }} PICKED
      <span class="has-text-success">{{ category.toUpperCase() }}</span>
    </h2>
    <div class="is-flex is-justify-content-center mt-5">
      <loader :size="150"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loader from '@/components/Loader.vue';

@Component({
  components: { Loader },
})
export default class CategoryPreview extends Vue {
  @Prop({ required: true }) turnUsername!: string

  @Prop({ required: true }) category!: string
}

</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.divider {
  display: flex;
  align-items: center;
  margin: 1em -1em;
  color: $white;
  opacity: 80%;

  &:before,
  &:after {
    content: "";
    flex: 1;
    height: 1px;
    margin: 0 1em;
    background: $white;
    opacity: 80%;
  }
}
</style>
