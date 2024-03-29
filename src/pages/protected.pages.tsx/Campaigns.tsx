import { useEffect, useState } from "react";

import axios from "axios";
import { BASE_URL } from "../../env";
import { Campaign } from "../../types/campaign.entity";
import HomeLogOff from "./components/HomeLogOff";
import CampaignViewPortrait from "./components/CampaignViewPortrait";
import { JoinCampaign } from "./components/JoinCampaign";

export const DM_Campaings = () => {
  const [campaings, setCampaings] = useState<Campaign[] | null>(null);

  useEffect(() => {
    const findCampaings = async () => {
      const token: string | null = localStorage.getItem("jwt");
      try {
        const response = await axios.get(
          `${BASE_URL}campaigns/getMyCampaigns`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCampaings(response.data);
      } catch (e) {
        console.log("erro");
      }
    };
    findCampaings();
  }, []);

  return (
    <div className="w-screen bg-red-bordo h-screen text-white font-oswald">
      <HomeLogOff />
      <div className="flex flex-col px-12 ">
        <div className="mt-16 flex flex-col space-y-10">
          <h1 className="text-3xl">MESAS:</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-10 auto-rows-[200px] ">
            <JoinCampaign setCampaigns={setCampaings} campaigns={campaings} />
            {campaings ? (
              campaings.map((campaing) => (
                <CampaignViewPortrait campaign={campaing} />
              ))
            ) : (
              <div className=" absolute -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2">
                <h1 className="text-4xl font-thin">CARREGANDO...</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DM_Campaings;
