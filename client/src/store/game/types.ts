import { Card } from '@/types/Card';
import { Category } from '@/types/Category';
import { Game } from '@/types/Game';
import { Player } from '@/types/Player';

export interface ModuleState {
  game: Game | null
  players: Player[]
  hand: Card[]
  categories: Category[]
}
