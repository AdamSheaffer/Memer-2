import { Timestamp } from "./Firebase";

export interface Card {
  uid?: string;
  top: string;
  bottom: string;
  createdBy?: string;
  createdAt?: Timestamp;
  safeForWork?: boolean;
  normalized?: string;
}

export type CaptionForm = Pick<Card, "top" | "bottom" | "safeForWork" | "uid">;
