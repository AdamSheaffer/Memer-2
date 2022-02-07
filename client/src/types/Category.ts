import { Timestamp } from "firebase/firestore";

export interface Category {
  id?: string;
  safeForWork?: boolean;
  description: string;
  createdAt?: Timestamp;
}

export type CategoryForm = Pick<Category, "description" | "safeForWork" | "id">;
