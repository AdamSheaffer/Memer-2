<template>
  <div class="wrapper">
    <div v-for="n in 150" :key="n" :class="`confetti-${n}`"></div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
.wrapper {
  position: absolute;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

[class|="confetti"] {
  position: absolute;
}

$colors: (#E94A3F, #FAA040, #17BC9E);

@for $i from 1 through 150 {
  $w: random(8);
  $l: random(100);
  .confetti-#{$i} {
    width: #{$w*4}px;
    height:#{$w*2}px;
    background-color: nth($colors, random(3));
    top: -10%;
    left: unquote($l+"%");
    opacity: random() + 0.5;
    transform: rotate(#{random()*360}deg);
    animation: drop-#{$i} unquote(4+random()+"s") unquote(random()+"s") infinite;
    z-index: 10000;
  }

  @keyframes drop-#{$i} {
    100% {
      top: 110%;
      left: unquote($l+random(15)+"%");
    }
  }
}
</style>
