import firebase from 'firebase/app';
import { realtimeDb, db } from '@/firebase';
import { OnlineStatus } from '@/types/OnlineStatus';

interface Presence {
  userId: string | null
  onlineStatusRef: firebase.database.Reference | null,
  userStatusDbRef: firebase.database.Reference | null,
}

const databaseOffline: OnlineStatus = {
  state: 'Offline',
  lastChanged: firebase.database.ServerValue.TIMESTAMP,
};

const databaseOnline: OnlineStatus = {
  state: 'Online',
  lastChanged: firebase.database.ServerValue.TIMESTAMP,
};

const firestoreOffline: OnlineStatus = {
  state: 'Offline',
  lastChanged: firebase.firestore.Timestamp.fromDate(new Date()),
};

const firestoreOnline: OnlineStatus = {
  state: 'Online',
  lastChanged: firebase.firestore.Timestamp.fromDate(new Date()),
};

const presence: Presence = {
  userId: null,
  onlineStatusRef: null,
  userStatusDbRef: null,
};

export const detectOnlinePresence = (userId: string): void => {
  if (userId === presence.userId) return;

  presence.userId = userId;
  presence.userStatusDbRef = realtimeDb.ref(`status/${userId}`);
  const firestoreUserRef = db.doc(`users/${userId}`);

  presence.onlineStatusRef = realtimeDb.ref('.info/connected');
  presence.onlineStatusRef.on('value', async (snapshot) => {
    if (snapshot.val() === false) {
      firestoreUserRef.update({ presence: firestoreOffline });
      return;
    }

    if (presence.userStatusDbRef) {
      await presence.userStatusDbRef?.onDisconnect().update(databaseOffline);
      presence.userStatusDbRef.update(databaseOnline);
      firestoreUserRef.update({ presence: firestoreOnline });
    }
  });
};

export const showOffline = (): Promise<void> => {
  const { onlineStatusRef, userId, userStatusDbRef } = presence;
  if (onlineStatusRef) {
    onlineStatusRef.off();
  }
  if (!userId || !userStatusDbRef) return Promise.resolve();

  presence.userId = null;
  return userStatusDbRef.set(databaseOffline);
};
