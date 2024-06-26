import { Skill } from "./skill.entity";

export type Character = {
  id: string;
  campaignId: string;
  playerId: string;
  name: string;
  className: string;
  subClassName: string;
  level: number;
  maxHitPoints: number;
  maxSanityPoints: number;
  maxEffortPoints: number;
  currentHitPoints: number;
  currentSanityPoints: number;
  currentEffortPoints: number;
  strength: number;
  dexterity: number;
  vitality: number;
  intelligence: number;
  presence: number;
  attacks: Attacks[];
  skills: Skill[];
};

export type Attacks = {
  name: string;
  quantityOfRollingDices: number;
  rollModifier: number;
  damageDie: number;
  quantityOfDamageDices: number;
  damageModifier: number;
  criticalRoll: number;
  criticalDies: number;
};

export type UpdateCharacter = {
  name: string;
  className: string;
  subClassName: string;
  level: number;
  maxHitPoints: number;
  maxSanityPoints: number;
  maxEffortPoints: number;
  strength: number;
  dexterity: number;
  vitality: number;
  intelligence: number;
  presence: number;
};
