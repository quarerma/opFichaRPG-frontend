export type Skill = {
  name: string;
  atribute: string;
  specialization: string;
  numberModifier: number;
};

export type SkillDetail = {
  name: string;
  description: string;
  only_trained: boolean;
  carry_peanalty: boolean;
  needs_kit: boolean;
  is_custom: boolean;
};
