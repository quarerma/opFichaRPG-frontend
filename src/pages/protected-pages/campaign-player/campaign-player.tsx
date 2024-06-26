import HomeLogOff from "../../global-components/home-and-logoff";
import CampaignViewPortrait from "./components/campaign-view";

import { useQuery } from "@tanstack/react-query";
import { getCampaignsAsPlayerData } from "../../../data/campaigns-data";
import { queryClient } from "../../../lib/react-query";
import JoinCampaign from "./components/join-campaign";

export const UserCampaigns = () => {
  const { data: userCampaigns } = useQuery({
    queryKey: ["userCampaigns"],
    queryFn: () => getCampaignsAsPlayerData(queryClient),
  });
  return (
    <div className="w-screen bg-red-bordo h-screen text-white font-oswald">
      <HomeLogOff />
      <div className="flex flex-col px-12 ">
        <div className="mt-16 flex flex-col space-y-10">
          <h1 className="text-3xl">MESAS:</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-10 auto-rows-[200px] ">
            <JoinCampaign />
            {userCampaigns ? (
              userCampaigns.map((campaing) => (
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

export default UserCampaigns;
