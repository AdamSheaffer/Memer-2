import firebase from 'firebase/app';

export interface ChatMessage {
  id?: string
  type: 'text' | 'emoji'
  content: string
  userId: string
  username: string
  photoURL: string
  timeStamp: firebase.firestore.Timestamp
}
