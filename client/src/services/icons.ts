/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBriefcase, faFaceDizzy, faHeart, faUsers } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);
library.add(faUsers);
library.add(faBriefcase);
library.add(faFaceDizzy);

export const heart = faHeart.iconName;
export const users = faUsers.iconName;
export const briefcase = faBriefcase.iconName;
export const faceDizzy = faFaceDizzy.iconName;
