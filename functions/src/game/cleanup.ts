import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const cleanup = functions.pubsub.schedule("every day 00:00").onRun(async () => {
  functions.logger.info("Cleaning up stale games");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const snapshot = await admin
    .firestore()
    .collection("games")
    .where("lastUpdated", "<", yesterday)
    .get();

  if (snapshot.empty) {
    functions.logger.info("No stale games. Skipping cleanup");
    return;
  }

  functions.logger.info(`Cleaning up ${snapshot.size} games`);

  // Delete Chat
  const chatDeletions = snapshot.docs.map((doc) => deleteCollection(doc.ref, "messages"));
  await Promise.all(chatDeletions);
  functions.logger.debug("All chat messages deleted");

  // Delete Players
  const playerDeletions = snapshot.docs.map((doc) => deletePlayers(doc.ref));
  const refs = (await Promise.all(playerDeletions)).flatMap((d) => d);
  functions.logger.debug("All players deleted");

  // Delete Hands
  const handDeletions = refs.map((r) => deletePlayerHand(r.gameId, r.playerId));
  await Promise.all(handDeletions);
  functions.logger.debug("All player hands deleted");

  // Delete Games
  const batch = admin.firestore().batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  functions.logger.debug("All games deleted");

  functions.logger.info(`Finished cleaning stale games`);
});

const deletePlayers = async (
  gameRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
) => {
  const batch = admin.firestore().batch();

  const snapshot = await gameRef.collection("players").get();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));

  await batch.commit();

  return snapshot.docs.map((doc) => ({ gameId: gameRef.id, playerId: doc.id }));
};

const deletePlayerHand = async (gameId: string, playerId: string) => {
  const handCollectionRef = admin
    .firestore()
    .collection(`games/${gameId}/players/${playerId}/cards`);
  const batch = admin.firestore().batch();

  const snapshot = await handCollectionRef.get();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));

  return batch.commit();
};

const deleteCollection = async (
  ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  collectionName: string
) => {
  const batch = admin.firestore().batch();

  const snapshot = await ref.collection(collectionName).get();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));

  return batch.commit();
};
