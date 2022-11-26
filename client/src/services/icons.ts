/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faBriefcase,
  faCheck,
  faFaceDizzy,
  faGavel,
  faHeart,
  faMessage,
  faRepeat,
  faThumbsDown,
  faUsers,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft);
library.add(faArrowAltCircleLeft);
library.add(faArrowAltCircleRight);
library.add(faBriefcase);
library.add(faCheck);
library.add(faFaceDizzy);
library.add(faGavel);
library.add(faHeart);
library.add(faMessage);
library.add(faRepeat);
library.add(faThumbsDown);
library.add(faUsers);
library.add(faXmarkCircle);

export const backArrow = faArrowLeft.iconName;
export const arrowLeft = faArrowAltCircleLeft.iconName;
export const arrowRight = faArrowAltCircleRight.iconName;
export const briefcase = faBriefcase.iconName;
export const check = faCheck.iconName;
export const faceDizzy = faFaceDizzy.iconName;
export const gavel = faGavel.iconName;
export const heart = faHeart.iconName;
export const message = faMessage.iconName;
export const reverse = faRepeat.iconName;
export const thumbsDown = faThumbsDown.iconName;
export const users = faUsers.iconName;
export const xMark = faXmarkCircle.iconName;
