import axios from "axios";
import { BASE_URL } from "../../../../env";
import { QueryClient } from "@tanstack/react-query";
import { SkillDetail } from "../../../../types/skill.entity";
const token: string | null = localStorage.getItem("jwt");

export async function updateCharacterSkills(
  skills: string[],
  characterId: string
) {
  try {
    return await axios.patch(
      `${BASE_URL}characters/updateCharacterSkilss/${characterId}`,
      skills,
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

export async function getSkillData(
  queryClient: QueryClient,
  name: string
): Promise<SkillDetail | undefined> {
  try {
    const cachedData = queryClient.getQueryData<SkillDetail>(["skills", name]);

    if (cachedData) {
      return cachedData;
    }
    const response = await axios.get(`${BASE_URL}skills/getByName/${name}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as SkillDetail;
  } catch (e) {
    console.log("erro");
  }
}
