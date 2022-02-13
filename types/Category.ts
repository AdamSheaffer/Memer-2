import { Timestamp } from "firebase/firestore";

export interface Category {
  uid?: string;
  safeForWork?: boolean;
  description: string;
  createdAt?: Timestamp;
}

export type CategoryForm = Pick<Category, "description" | "safeForWork" | "uid">;
