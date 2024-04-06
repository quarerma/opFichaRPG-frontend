import axios from "axios";
import { BASE_URL } from "../env";
import { CreateCharacterSchema } from "../pages/protected-pages/create-character";
import { Attacks, Character } from "../types/character.entity";
import { v4 as uuidv4 } from "uuid";

const token: string | null = localStorage.getItem("jwt");

export async function createCharacter(
  characterData: CreateCharacterSchema,
  campaignId?: string
) {
  try {
    const id = uuidv4();

    const newCharacter = {
      id,
      ...characterData,
      campaignId,
    };
    console.log(newCharacter);
    const response = await axios.post(
      `${BASE_URL}characters/create`,
      newCharacter,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(newCharacter);
    return response.data as Character;
  } catch (e) {
    console.log("erro");
  }
}

export async function addAttack(attack: Attacks, characterId: string) {
  try {
    await axios.patch(
      `${BASE_URL}characters/addAttack/${characterId}`,
      attack,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.log("erro");
  }
}

export async function updateStats(
  characterId: string,
  value: string,
  stat: string
) {
  let patchURL;
  if (stat === "SanityPoints")
    patchURL = `${BASE_URL}characters/updateSanityPoints`;
  if (stat === "HitPoints") patchURL = `${BASE_URL}characters/updateHitPoints`;
  if (stat === "EffortPoints")
    patchURL = `${BASE_URL}characters/updateEffortPoints`;

  console.log(typeof value);
  try {
    await axios.get(
      `${patchURL}/${value}/${characterId}`, // A ordem dos parâmetros deve ser mantida como você tinha inicialmente
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw new Error("Erro ao atualizar stats");
  }
}
