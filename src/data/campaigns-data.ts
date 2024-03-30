import axios from "axios";
import { BASE_URL } from "../env";
import { Campaign } from "../types/campaign.entity";

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
