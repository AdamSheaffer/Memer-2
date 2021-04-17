import { Game } from '@/types/Game';
import { Player } from '@/types/Player';

export interface ModuleState {
  game: Game | null
  players: Player[]
}
