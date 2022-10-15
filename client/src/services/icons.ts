/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faBriefcase,
  faFaceDizzy,
  faGavel,
  faHeart,
  faUsers,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);
library.add(faUsers);
library.add(faBriefcase);
library.add(faFaceDizzy);
library.add(faXmarkCircle);
library.add(faGavel);
library.add(faArrowAltCircleLeft);
library.add(faArrowAltCircleRight);

export const heart = faHeart.iconName;
export const users = faUsers.iconName;
export const briefcase = faBriefcase.iconName;
export const faceDizzy = faFaceDizzy.iconName;
export const xMark = faXmarkCircle.iconName;
export const gavel = faGavel.iconName;
export const arrowLeft = faArrowAltCircleLeft.iconName;
export const arrowRight = faArrowAltCircleRight.iconName;
