import axios from "axios";
import { BASE_URL } from "../env";
import { QueryClient } from "@tanstack/react-query";

const token: string | null = localStorage.getItem("jwt");
export async function checkIfUserIsDM(
  queryClient: QueryClient,
  campaignId?: string
) {
  const cachedData = queryClient.getQueryData<boolean>(["isDM", campaignId]);
  console.log("entrou pra checar");
  if (cachedData) {
    return cachedData;
  }
  try {
    console.log("fez fetch DM");
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
