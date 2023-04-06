import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const onCreateAddTimestamp = functions.firestore
  .document("categories/{categoryId}")
  .onCreate((categorySnapshot) => {
    const category = categorySnapshot.data();

    if (!category) {
      throw Error("Function triggered but no category was added");
    }

    const updates = {
      createdAt: admin.firestore.Timestamp.now(),
    };

    return categorySnapshot.ref.update(updates);
  });
