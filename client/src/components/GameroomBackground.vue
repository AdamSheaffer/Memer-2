<template>
  <div>
    <div class="container">
      <div class="table">
        <div class="mat"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/_variables';

.container {
  min-height: 100%;
  height: auto;
  min-width: 100vw;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: $purple-1;
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  grid-template-rows: 1fr 80% 1fr;
  z-index: -1000;
}

.table {
  grid-column-start: 2;
  grid-row-start: 2;
  background: $purple-2;
  height: 100%;
  width: 100%;
  border-radius: 2em;
  box-shadow: 1rem 2rem 1rem rgba($purple-2, .7);
  grid-template-columns: 1fr 90% 1fr;
  grid-template-rows: 1fr 80% 1fr;
  display: grid;
}

.mat {
  grid-column-start: 2;
  grid-row-start: 2;
  width: 100%;
  height: 100%;
  background: $purple-1;
  border-radius: 25em;
}
</style>
