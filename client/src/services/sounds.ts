import { Howl } from "howler";
import affirmative from "../assets/sounds/affirmative-click.mp3";
import negative from "../assets/sounds/negative-click.mp3";
import swipe from "../assets/sounds/swipe.mp3";

export const affirmativeSound = new Howl({ src: [affirmative] });
export const negativeSound = new Howl({ src: [negative] });
export const swipeForwardSound = new Howl({ src: [swipe], volume: 0.2 });
export const swipeBackSound = new Howl({ src: [swipe], volume: 0.2 });
export const whooshSound = new Howl({ src: [swipe], rate: 0.5, volume: 0.5 });

const modifierDictionary: Record<string, Howl> = {
  affirmative: affirmativeSound,
  negative: negativeSound,
  swipeForward: swipeForwardSound,
  swipeBack: swipeBackSound,
};
