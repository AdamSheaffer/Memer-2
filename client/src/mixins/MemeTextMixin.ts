import { Meme } from '@/types/Meme';
import { Component, Vue } from 'vue-property-decorator';

@Component
class MemeTextMixin extends Vue {
  public headerSize = 1;

  public readonly maxHeaderSize = 7; // 7 is bulma's smallest

  get headerClass(): string {
    return `is-size-${this.headerSize}`;
  }

  setHeaderSize({ bottom, top }: Meme, divisor = 0.6): void {
    const longestText = (bottom?.length ?? 0) > (top?.length ?? 0) ? bottom : top;
    const characters = longestText?.length ?? 0;

    // if (!characters) return;

    if (characters < 10) {
      this.headerSize = 1;
    } else if (characters < 15) {
      this.headerSize = 2;
    } else if (characters < 20) {
      this.headerSize = 3;
    } else if (characters < 30) {
      this.headerSize = 4;
    } else if (characters < 40) {
      this.headerSize = 5;
    } else {
      this.headerSize = 6;
    }

    // this.headerSize = headerSize > this.maxHeaderSize ? this.maxHeaderSize : headerSize;
  }
}
export default MemeTextMixin;
