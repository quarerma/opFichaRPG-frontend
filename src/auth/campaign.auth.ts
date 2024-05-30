import axios from "axios";
import { BASE_URL } from "../env";
import { QueryClient } from "@tanstack/react-query";

const token: string | null = localStorage.getItem("jwt");
export async function checkIfUserIsDM(
  queryClient: QueryClient,
  campaignId?: string
) {
  const cachedData = queryClient.getQueryData<boolean>(["isDM", campaignId]);

  if (cachedData) {
    return cachedData;
  }
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

export async function checkIfPlayerIsInCampaign(
  queryClient: QueryClient,
  campaignId?: string
) {
  const cachedData = queryClient.getQueryData<boolean>([
    "isPlayer",
    campaignId,
  ]);

  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(
      `${BASE_URL}campaigns/checkIfPlayerIsInCampaign/${campaignId}`,
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
