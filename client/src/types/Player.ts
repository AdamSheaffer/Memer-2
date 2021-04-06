import { Meme } from './Meme';
import { Roles } from './User';

export interface Player {
  uid: string
  fullName: string
  username: string
  photoURL: string
  isActive: boolean
  score: number
  memePlayed?: Meme
  imageUrlPlayed?: string
  roles: Roles
  removed?: boolean
}

export interface PlayerChanges {
  isActive?: boolean
  score?: number
  memePlayed?: Meme
  removed?: boolean
}
