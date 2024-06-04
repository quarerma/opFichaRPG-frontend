import axios from "axios";
import { UpdateCharacterSchema } from "../subpages/editCharacter";
import { BASE_URL } from "../../../../env";
const token: string | null = localStorage.getItem("jwt");

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

export async function updateCharacter(
  characterData: UpdateCharacterSchema,
  characterId?: string
) {
  try {
    return await axios.patch(
      `${BASE_URL}characters/updateCharacter/${characterId}`,
      characterData,
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

