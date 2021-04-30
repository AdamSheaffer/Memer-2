<template>
  <div class="pill" :class="{ active, large, mirrored }">
    <b-image
      :src="player.photoURL || require('../assets/this_is_fine.jpeg')"
      :src-fallback="require('../assets/this_is_fine.jpeg')"
      ratio="1by1"
      rounded
      class="avatar"
      :class="{ active }"
    >
      <template #placeholder>
        <b-loading class="avatar" :is-full-page="false" :active="true" />
      </template>
    </b-image>
    <div class="pill-content mt-2 ml-2">
      <p class="is-size-6">{{ player.username }}</p>
      <p class="is-size-7">{{ player.score || 0 }}/{{ pointsToWin }}</p>
      <div :class="{'hearts-wrapper' : mirrored}">
        <b-icon
          v-for="i in pointsToWin"
          :key="i"
          :type="i <= player.score ? 'is-danger' : 'is-white'"
          icon="heart"
          size="is-small" />
      </div>
    </div>
    <div class="badge" :class="{ ready }">
      <!-- <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg> -->
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
      <!-- <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg> -->
    </div>
    <div class="badgeBackground" :class="{ ready }">
      <!-- <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg> -->
      <!-- <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg> -->
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg>
    </div>
  </div>
  
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { Player } from '@/types/Player';

@Component
export default class PlayerChip extends Vue {
  @Prop({ required: true }) player!: Player

  @Prop({ required: true }) pointsToWin!: number

  @Prop({ default: false, required: false }) active!: boolean

  @Prop({ default: false, required: false }) large!: boolean

  @Prop({ default: false, required: false }) ready!: boolean

  @Prop({ default: false, required: false }) mirrored!: boolean
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

$pill-radius: 5rem;
$transition: border .15s ease-out;

.pill {
  width: 110%;
  max-width: 15rem;
  background: $primary;
  display: grid;
  grid-template-columns: 25% 1fr;
  border-radius: $pill-radius;
  transition: $transition;
  display: grid;
  grid-template-columns: $pill-radius 1fr;
  position:relative
}

.large {
  transform: scale(1.2);
}

.mirrored {
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);
  -ms-filter: fliph; /*IE*/
  filter: fliph; /*IE*/
    
    .badge {
      right: auto;
      left: 2px;
      -moz-transform: scaleX(-1) scale(.9);
      -webkit-transform: scaleX(-1) scale(.9);
      -o-transform: scaleX(-1) scale(.9);
      transform: scaleX(-1) scale(.9);
      -ms-filter: fliph; /*IE*/
      filter: fliph; /*IE*/
    }

    .badgeBackground {
      left: 2px;
      right: auto;
      -moz-transform: scaleX(-1) scale(1.5);
      -webkit-transform: scaleX(-1) scale(1.5);
      -o-transform: scaleX(-1) scale(1.5);
      transform: scaleX(-1) scale(1.5);
      -ms-filter: fliph; /*IE*/
      filter: fliph; /*IE*/
    }

    .pill-content {
      -moz-transform: scaleX(-1);
      -webkit-transform: scaleX(-1);
      -o-transform: scaleX(-1);
      transform: scaleX(-1);
      -ms-filter: fliph; /*IE*/
      filter: fliph; /*IE*/

      p  {
        text-align: end;
      }

      .hearts-wrapper {
        float: right;
      }
    }
}

.badge {
  z-index: 5;
  right: 2px;
  top: 1px;
  transform: scale(.9);
  color: white;
  display: none;
  
  &.ready {
    display: block;
    position: absolute;
  }
}

.badgeBackground {
  z-index: 4;
  right: 2px;
  top: 0px;
  transform: scale(1.5);
  color: #39FF14;
  display: none;
  
  &.ready {
    display: block;
    position: absolute;
  }
}

.avatar {
  width: $pill-radius;
  height: $pill-radius;
  border-radius: $pill-radius;
  transition: $transition;
  
  &.active {
    border-left: 0;
  }
}

.pill-content {
  @include impact-text;
}

.active {
  border: 3px solid $yellow;
  transition: $transition;
}
</style>
