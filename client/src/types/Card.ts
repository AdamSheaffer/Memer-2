import { Timestamp } from "firebase/firestore";

export interface Card {
  id?: string;
  top: string;
  bottom: string;
  createdBy?: string;
  createdAt?: Timestamp;
  safeForWork?: boolean;
  normalized?: string;
}

export type CaptionForm = Pick<Card, "top" | "bottom" | "safeForWork" | "id">;
