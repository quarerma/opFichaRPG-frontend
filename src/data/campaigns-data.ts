import axios from "axios";
import { BASE_URL } from "../env";
import { Campaign } from "../types/campaign.entity";
import { Character } from "../types/character.entity";
import { QueryClient } from "@tanstack/react-query";

const token: string | null = localStorage.getItem("jwt");
export async function getCampaignsAsGameMasterData(queryClient: QueryClient) {
  const cachedData = queryClient.getQueryData<Campaign[]>(["DMcampaigns"]);

  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(
      `${BASE_URL}campaigns/getMyCampaignsAsGameMaster`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as Campaign[];
  } catch (e) {
    console.log("erro");
  }
}

export async function getCampaignsAsPlayerData(queryClient: QueryClient) {
  const cachedData = queryClient.getQueryData<Campaign[]>(["userCampaigns"]);

  if (cachedData) {
    console.log("consultou novamente");
    return cachedData;
  }
  try {
    console.log("fez fetch");
    const response = await axios.get(`${BASE_URL}campaigns/getMyCampaigns`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Campaign[];
  } catch (e) {
    console.log("erro");
  }
}

export async function getCampaignById(campaignId?: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}campaigns/getById/${campaignId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as Campaign;
  } catch (e) {
    console.log("erro");
  }
}

export async function getPlayerCharacter(
  queryClient: QueryClient,
  campaignId?: string
) {
  const cachedData = queryClient.getQueryData<Character>([
    "playerCharacter",
    campaignId,
  ]);
  console.log("em cache", cachedData);
  if (cachedData) {
    return cachedData;
  }
  try {
    console.log("fez fetch personagem");
    const response = await axios.get(
      `${BASE_URL}campaigns/getPlayerCharacter/${campaignId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as Character;
  } catch (e) {
    console.log("erro");
  }
}
export async function getAllCharactersFromCampaign(
  queryClient: QueryClient,
  campaignId?: string
) {
  const cachedData = queryClient.getQueryData<Character[]>([
    "charactersCampaign",
    campaignId,
  ]);

  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(
      `${BASE_URL}campaigns/getAllCharacters/${campaignId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as Character[];
  } catch (e) {
    console.log("erro");
  }
}
