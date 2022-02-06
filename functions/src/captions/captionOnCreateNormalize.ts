import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const captionOnCreateNormalize = functions.firestore
  .document("captions/{captionId}")
  .onCreate(async (captionSnapshot) => {
    const caption = captionSnapshot.data();

    if (!caption) {
      throw Error("Function triggered but no caption was added");
    }

    const normalized = `${caption.top} ${caption.bottom}`;

    const updates = {
      createdAt: admin.firestore.Timestamp.now(),
      normalized: normalized.toUpperCase().trim(),
    };

    return captionSnapshot.ref.update(updates);
  });
