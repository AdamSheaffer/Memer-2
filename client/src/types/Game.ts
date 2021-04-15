import firebase from 'firebase/app';

export interface Game {
  uid?: string
  beginDate?: firebase.firestore.Timestamp
  hasStarted: boolean
  hostId?: string | null
  maxPlayers: number
  hostPhotoURL?: string | null,
  pointsToWin: number,
  safeForWork: boolean,
  reverseRoundFrequency: number
  lastUpdated?: firebase.firestore.Timestamp
}

export interface GameUpdate {
  uid: string,
  beginDate?: firebase.firestore.Timestamp
  hasStarted?: boolean
  hostId?: string
  hostPhotoURL?: string | null,
  lastUpdated?: firebase.firestore.Timestamp
}
