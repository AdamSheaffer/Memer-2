import firebase, { db } from '@/firebase';
import { Game, GameUpdate } from '@/types/Game';
import { User } from '@/types/User';

const create = async (game: Game): Promise<string> => {
  const uid = db.collection('games').doc().id;
  const payload: Game = {
    uid,
    beginDate: firebase.firestore.Timestamp.now(),
    lastUpdated: firebase.firestore.Timestamp.now(),
    ...game,
  };
  await db.doc(`games/${uid}`).set(payload);
  return uid;
};

const update = (game: GameUpdate): Promise<void> => {
  const payload: GameUpdate = {
    lastUpdated: firebase.firestore.Timestamp.now(),
    ...game,
  };
  return db.doc(`games/${game.uid}`).update(payload);
};

const joinGame = (gameId: string, user: User): Promise<void> => db
  .doc(`games/${gameId}/players/${user.uid}`)
  .set(user);

export default {
  create,
  update,
  joinGame,
};
