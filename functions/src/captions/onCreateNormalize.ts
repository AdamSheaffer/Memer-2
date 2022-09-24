import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Card } from "../../../types";

export const onCreateNormalize = functions.firestore
  .document("captions/{captionId}")
  .onCreate(async (captionSnapshot) => {
    const caption = captionSnapshot.data() as Card;

    if (!caption) {
      throw Error("Function triggered but no caption was added");
    }

    const normalized = `${caption.top} ${caption.bottom}`;

    const updates: Partial<Card> = {
      createdAt: admin.firestore.Timestamp.now(),
      normalized: normalized.toUpperCase().trim(),
    };

    return captionSnapshot.ref.update(updates);
  });
