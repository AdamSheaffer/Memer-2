/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faBriefcase,
  faCheck,
  faFaceDizzy,
  faGavel,
  faHeart,
  faUsers,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowAltCircleLeft);
library.add(faArrowAltCircleRight);
library.add(faBriefcase);
library.add(faCheck);
library.add(faFaceDizzy);
library.add(faGavel);
library.add(faHeart);
library.add(faUsers);
library.add(faXmarkCircle);

export const arrowLeft = faArrowAltCircleLeft.iconName;
export const arrowRight = faArrowAltCircleRight.iconName;
export const briefcase = faBriefcase.iconName;
export const check = faCheck.iconName;
export const faceDizzy = faFaceDizzy.iconName;
export const gavel = faGavel.iconName;
export const heart = faHeart.iconName;
export const users = faUsers.iconName;
export const xMark = faXmarkCircle.iconName;
