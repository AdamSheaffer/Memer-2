import firebase from 'firebase/app';
import { Meme } from './Meme';
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
  roundWinner?: string | null
  winner?: string | null
  winningMeme?: Meme | null
  roundType?: RoundType | null
  maxPlayers?: number
  pointsToWin?: number,
  safeForWork?: boolean,
  reverseRoundFrequency?: number
  timeLimit?: number
  lastUpdated?: firebase.firestore.Timestamp
}
