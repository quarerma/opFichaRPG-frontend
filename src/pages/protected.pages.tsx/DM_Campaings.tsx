import { useEffect, useState } from "react";
import LogOff from "./components/LogOff";
import { RedirectHome } from "./components/RedirectHome";
import axios from "axios";
import { BASE_URL } from "../../env";
import { Campaign } from "../../types/campaign.entity";

export const DM_Campaings = () => {
  const [campaings, setCampaings] = useState<Campaign[] | null>(null);

  useEffect(() => {
    const findCampaings = async () => {
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

        setCampaings(response.data);
        console.log(campaings);
      } catch (e) {
        console.log("erro");
      }
    };
    findCampaings();
  }, []);

  return (
    <div className="w-screen">
      <div className="flex right-0 w-full relative">
        <RedirectHome />
        <LogOff />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl">Campanhas</h1>
        <div className="flex flex-col">
          {campaings?.map((campaing) => (
            <div key={campaing.id} className="flex flex-col">
              <h2>{campaing.name}</h2>
              <p>{campaing.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DM_Campaings;
