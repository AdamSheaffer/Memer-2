import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Category } from "../../../types";

export const categoryOnCreateTimestamp = functions.firestore
  .document("categories/{categoryId}")
  .onCreate(async (categorySnapshot) => {
    const category = categorySnapshot.data() as Category;

    if (!category) {
      throw Error("Function triggered but no category was added");
    }

    const updates: Partial<Category> = {
      createdAt: admin.firestore.Timestamp.now(),
    };

    return categorySnapshot.ref.update(updates);
  });
