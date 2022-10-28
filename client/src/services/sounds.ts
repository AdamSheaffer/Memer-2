import { Howl } from "howler";
import affirmative from "../assets/sounds/affirmative-click.mp3";
import negative from "../assets/sounds/negative-click.mp3";
import swipe from "../assets/sounds/swipe.mp3";

export const affirmativeSound = new Howl({ src: [affirmative] });
export const negativeSound = new Howl({ src: [negative] });
export const swipeForwardSound = new Howl({ src: [swipe] });
export const swipeBackSound = new Howl({ src: [swipe], rate: 0.8 });
