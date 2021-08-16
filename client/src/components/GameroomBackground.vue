<template>
  <div class="gameroom-background-root">
    <div class="gameroom-background">
      <div class="table">
        <div class="mat"></div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/_variables';

.gameroom-background-root {
  position: relative;
  height: 100%;
  width: 100%;
}

.gameroom-background {
  min-height: 100vh;
  height: 100%;
  min-width: 100vw;
  width: 100%;
  position: absolute;
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
  border-radius: $tile-border-radius;
  grid-template-columns: 1fr 90% 1fr;
  grid-template-rows: 1fr 80% 1fr;
  display: grid;
  @include box-shadow;
}

.mat {
  grid-column-start: 2;
  grid-row-start: 2;
  width: 100%;
  height: 100%;
  background: $purple-1;
  border-radius: 25rem;
}
</style>
