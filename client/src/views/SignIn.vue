<template>
  <div class="sign-in px-5">
    <div class="columns is-centered">
      <div class="column is-two-fifths-desktop is-three-fifths">
        <div class="tile-outer">
          <div class="tile-inner pt-6 px-6">
            <div>
              <h1 class="is-size-1">MEMER</h1>
              <h2>THE ONLINE GAME FOR MEME LORDS</h2>
            </div>
            <div>
              <b-button
                size="is-large"
                expanded
                type="is-primary"
                @click="signIn">
                SIGN IN WITH GOOGLE
              </b-button>
            </div>
            <div class="giphy-logo">
              <b-image
                :responsive="false"
                :src="require('@/assets/PoweredbyGiphy_100px.png')"
                alt="Powered by Giphy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { googleSignIn } from '@/firebase';

@Component
export default class Home extends Vue {
  async signIn(): Promise<void> {
    await googleSignIn();
    this.$router.push('/');
  }
}
</script>

<style scoped lang="scss">
@import '../styles/_variables';

.sign-in {
  height: 100%;
  background: $purple-1;
  display: grid;
  align-content: center;
}

.tile-outer {
  background: $purple-2;
  padding: 2rem;
  border-radius: $tile-border-radius;
  @include box-shadow;
}

.tile-inner {
  border: 5px solid $purple-1;
  border-radius: $tile-border-radius;
  height: 600px;
  color: $white;
  display: grid;
  grid-template-rows: 60% 1fr 3fr;
}

.giphy-logo {
  align-self: center;
  justify-self: center;
}
</style>
