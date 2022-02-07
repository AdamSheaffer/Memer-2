export enum RoundTypeOption {
  Standard = "Standard",
  Reverse = "Reverse",
}

export interface RoundType {
  roundType: RoundTypeOption;
  isSpecial: boolean;
}
