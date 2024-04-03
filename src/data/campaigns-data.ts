import axios from "axios";
import { BASE_URL } from "../env";
import { Campaign } from "../types/campaign.entity";
import { Character } from "../types/character.entity";

export async function getCampaignsAsGameMasterData() {
  const token: string | null = localStorage.getItem("jwt");
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

export async function getCampaignsAsPlayerData() {
  const token: string | null = localStorage.getItem("jwt");
  try {
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
  const token: string | null = localStorage.getItem("jwt");
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

export async function getPlayerCharacter(campaignId?: string) {
  const token: string | null = localStorage.getItem("jwt");
  try {
    const response = await axios.get(
      `${BASE_URL}campaigns/getPlayerCharacter/${campaignId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data as Character;
  } catch (e) {
    console.log("erro");
  }
}
