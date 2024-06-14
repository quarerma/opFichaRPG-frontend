import axios from "axios";
import { BASE_URL } from "../env";
import { Attacks, Character } from "../types/character.entity";
import { v4 as uuidv4 } from "uuid";
import { CreateCharacterSchema } from "../pages/protected-pages/view-campaign-player/subpages/create-character";
import { QueryClient } from "@tanstack/react-query";

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

export async function getUserCharacters(queryClient: QueryClient) {
  const cachedData = queryClient.getQueryData<Character[]>(["characters"]);

  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(`${BASE_URL}users/getUserCharacter`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Character[];
  } catch (e) {
    console.log("erro");
  }
}
