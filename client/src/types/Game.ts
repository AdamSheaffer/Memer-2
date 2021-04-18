import firebase from 'firebase/app';
import { Card } from './Card';
import { Meme } from './Meme';
import { Player } from './Player';
import { RoundType } from './RoundType';

export interface Game {
  uid?: string
  beginDate?: firebase.firestore.Timestamp
  hasStarted?: boolean
  hostId?: string | null
  hostPhotoURL?: string | null
  turn?: string
  tagOptions?: string[] | null
  tagSelection?: string | null
  gifOptionURLs?: string[] | null
  memeTemplate?: Meme | null
  memeTemplateTimestamp?: firebase.firestore.Timestamp | null
  roundWinnder?: Player | null
  captionDeck?: Card[]
  winner?: Player | null
  roundType?: RoundType | null
  maxPlayers?: number
  pointsToWin?: number,
  safeForWork?: boolean,
  reverseRoundFrequency?: number
  timeLimit?: number
  lastUpdated?: firebase.firestore.Timestamp
}
