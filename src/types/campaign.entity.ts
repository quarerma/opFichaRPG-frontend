export type Campaign = {
  id: string;
  name: string;
  description?: string;
  password?: string;
  charactersId?: string[];
  playersId?: string[];
  gameMasterId: string;
};

export type CreateCampaingDTO = {
  name: string;
  description: string;
  password?: string;
  gameMasterId: string;
};
