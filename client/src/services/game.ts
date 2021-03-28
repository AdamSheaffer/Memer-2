import firebase, { db } from '@/firebase';
import { Game, GameUpdate } from '@/types/Game';

const create = async (game: Game): Promise<string> => {
  const uid = db.collection('games').doc().id;
  const payload: Game = {
    uid,
    beginDate: firebase.firestore.Timestamp.now(),
    lastUpdated: firebase.firestore.Timestamp.now(),
    ...game,
  };
  const res = await db.collection('games').add(payload);
  return res.id;
};

const update = (game: GameUpdate): Promise<void> => {
  const payload: GameUpdate = {
    lastUpdated: firebase.firestore.Timestamp.now(),
    ...game,
  };
  return db.doc(`games/${game.uid}`).update(payload);
};

export default {
  create,
  update,
};
