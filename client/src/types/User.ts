export interface Presence {
  game?: string
  lastChanged: Date
  player: string
  state: 'Online' | 'Offline'
}

export interface Roles {
  admin?: boolean
  editor?: boolean
  player: boolean
}

export interface User {
  uid: string
  fullName?: string | null
  gamesPlayed?: number | null
  lastChanged?: Date | null
  photoURL?: string | null
  presence?: Presence | null
  roles?: Roles | null
  totalPoints?: number | null
  username?: string | null
}
