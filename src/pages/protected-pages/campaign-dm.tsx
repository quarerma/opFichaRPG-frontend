import HomeLogOff from "./components/home-and-logoff";
import CampaignViewPortrait from "./components/campaign-view";
import { useQuery } from "@tanstack/react-query";
import { getCampaignsAsGameMasterData } from "../../data/campaigns-data";
import { CreateCampaignComponent } from "./components/create-campaign-component";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

export const DM_Campaings = () => {
  const { data: campaings } = useQuery({
    queryKey: ["DMcampaigns"],
    queryFn: getCampaignsAsGameMasterData,
  });
  useEffect(() => {
    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) {
      toast.success(successMessage);
      localStorage.removeItem("successMessage"); // Remover a mensagem após exibição
    }
  }, []);

  return (
    <div className="w-screen bg-red-bordo h-screen text-white font-oswald">
      <HomeLogOff />
      <Toaster />
      <div className="flex flex-col px-12 ">
        <div className="mt-16 flex flex-col space-y-10">
          <h1 className="text-3xl">MINHAS CAMPANHAS:</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-10 auto-rows-[200px] ">
            <CreateCampaignComponent />
            {campaings ? (
              campaings?.map((campaing) => (
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
