import axios from "axios";
import { BASE_URL } from "../env";

export async function checkIfUserIsDM(campaignId?: string) {
  const token: string | null = localStorage.getItem("jwt");
  try {
    const response = await axios.get(
      `${BASE_URL}campaigns/checkIfGameMaster/${campaignId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as boolean;
  } catch (e) {
    console.log("erro ao checar usuario");
  }
}
