<template>
    <div v-show="loading" class="lds-grid" :style="{ width: `${size}px`, height: `${size}px` }">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {
  @Prop({ required: false, default: true }) loading!: boolean

  @Prop({ required: false, default: 80 }) size!: number

  @Prop({ required: false, default: 'primary' }) color!: string

  @Prop({ required: false, default: '1.2s' }) duration!: string

  spinnerStyle = {
    background: this.color,
    animationDuration: this.duration,
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.dot {
  background: $primary !important;
  animation-duration: 1.2s;
}

.lds-grid {
    display: inline-flex;
    flex-wrap: wrap;
}
.lds-grid div {
    width: 20%;
    height: 20%;

    margin-top: 10%;
    margin-left: 10%;

    border-radius: 50%;
    background: #fff;
    animation-name: lds-grid;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}
.lds-grid div:nth-child(1) {
    animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
    animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
    animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
    animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
    animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
    animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
    margin-bottom: 10%;
    animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
    animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
    animation-delay: -1.6s;
}
@keyframes lds-grid {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
