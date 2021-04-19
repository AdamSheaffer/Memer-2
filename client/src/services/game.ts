import shuffle from 'lodash.shuffle';
import chunk from 'lodash.chunk';
import firebase, { db } from '@/firebase';
import { Game } from '@/types/Game';
import { User } from '@/types/User';
import { Card } from '@/types/Card';

const gameRef = (gameId: string) => db.doc(`games/${gameId}`);
const playersRef = (gameId: string) => gameRef(gameId).collection('players');
const playerRef = (gameId: string, playerId: string) => playersRef(gameId).doc(playerId);
const captionsRef = db.collection('captions');

const create = async (game: Game): Promise<string> => {
  const uid = db.collection('games').doc().id;
  const payload: Game = {
    uid,
    beginDate: firebase.firestore.Timestamp.now(),
    lastUpdated: firebase.firestore.Timestamp.now(),
    ...game,
  };
  await gameRef(uid).set(payload);
  return uid;
};

const update = (game: Game, gameId: string): Promise<void> => {
  if (!gameId && !game.uid) {
    throw Error('Must supply a game ID to update');
  }

  const payload: Game = {
    lastUpdated: firebase.firestore.Timestamp.now(),
    ...game,
  };
  return gameRef(gameId).update(payload);
};

const joinGame = (gameId: string, user: User): Promise<void> => db
  .doc(`games/${gameId}/players/${user.uid}`)
  .set(user);

const startGame = (gameId: string, playerId: string): Promise<void> => update({
  hasStarted: true,
  turn: playerId,
}, gameId);

const createHands = async (handsNeeded: number): Promise<Card[][]> => {
  const snapshot = await captionsRef.get();
  const deck = snapshot.docs.map((doc) => doc.data() as Card);
  const shuffled = shuffle(deck);
  const hands = chunk(shuffled, handsNeeded).slice(0, handsNeeded);
  return hands;
};

const dealToAllPlayers = async (gameId: string, playerIds: string[]): Promise<void> => {
  const hands = await createHands(playerIds.length);

  playerIds.forEach((playerId, index) => {
    const batch = db.batch();
    const handCollection = playerRef(gameId, playerId).collection('cards');
    const hand = hands[index];
    hand.forEach((card: Card) => {
      const ref = handCollection.doc(card.id);
      batch.set(ref, card);
    });
    batch.commit();
  });
};

export default {
  create,
  update,
  joinGame,
  startGame,
  dealToAllPlayers,
};
