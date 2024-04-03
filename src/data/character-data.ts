import axios from "axios";
import { BASE_URL } from "../env";
import { CreateCharacterSchema } from "../pages/protected-pages/create-character";
import { Character } from "../types/character.entity";
import { v4 as uuidv4 } from "uuid";

export async function createCharacter(
  characterData: CreateCharacterSchema,
  campaignId?: string
) {
  try {
    const id = uuidv4();

    const token: string | null = localStorage.getItem("jwt");
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
