import { Meme } from '@/types/Meme';
import { Component, Vue } from 'vue-property-decorator';

export enum TextScaling {
  Small, Medium, Large
}

const scaleOffset = new Map<TextScaling, number>([
  [TextScaling.Small, 5],
  [TextScaling.Medium, 0],
  [TextScaling.Large, -5],
]);

@Component
class MemeTextMixin extends Vue {
  public headerSize = 1;

  public readonly maxHeaderSize = 7; // 7 is bulma's smallest

  get headerClass(): string {
    return `is-size-${this.headerSize}`;
  }

  setHeaderSize({ bottom, top }: Meme, scale: TextScaling = TextScaling.Medium): void {
    const longestText = (bottom?.length ?? 0) > (top?.length ?? 0) ? bottom : top;
    const characters = longestText?.length ?? 0;

    const offset = scaleOffset.get(scale) ?? 0;

    if (characters < (10 - offset)) {
      this.headerSize = 1;
    } else if (characters < (15 - offset)) {
      this.headerSize = 2;
    } else if (characters < (20 - offset)) {
      this.headerSize = 3;
    } else if (characters < (25 - offset)) {
      this.headerSize = 4;
    } else if (characters < (40 - offset)) {
      this.headerSize = 5;
    } else {
      this.headerSize = 6;
    }
  }
}
export default MemeTextMixin;
