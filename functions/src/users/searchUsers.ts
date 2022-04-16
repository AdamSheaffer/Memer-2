import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { User } from "../../../types";

interface UserSearch {
  email: string;
}

export const searchUsers = functions.https.onCall(async (data: UserSearch, context) => {
  // Confirm user making request has admin role
  const requestUserId = context.auth?.uid;

  if (!requestUserId) {
    throw new functions.https.HttpsError("unauthenticated", "Unauthenticated");
  }

  let requestUser: User;

  try {
    const requestUserSnap = await admin.firestore().doc(`users/${requestUserId}`).get();

    requestUser = requestUserSnap.data() as User;
  } catch (error) {
    throw Error("Error while fetching profile of request user");
  }

  if (!requestUser?.roles?.admin) {
    throw new functions.https.HttpsError("permission-denied", "Permission Denied");
  }

  // Search by email param

  const { email } = data;
  if (!email) {
    throw new functions.https.HttpsError("invalid-argument", "Missing `email` argument");
  }

  try {
    const user = await admin.auth().getUserByEmail(email);

    // Get profile data
    const profileSnap = await admin.firestore().doc(`users/${user.uid}`).get();

    if (!profileSnap.exists) {
      throw new functions.https.HttpsError("not-found", "No matching user found");
    }

    return profileSnap.data();
  } catch (e) {
    const error = e as { code: string };

    console.log(`Error fetching user with email ${email}`);
    if (error.code === "auth/user-not-found") {
      throw new functions.https.HttpsError("not-found", "No matching user found", error);
    }

    throw error;
  }
});
