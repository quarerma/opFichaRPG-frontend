import { useState } from "react";
import CampaignViewPortrait from "./components/campaign-view";
import { useQuery } from "@tanstack/react-query";
import { getCampaignsAsPlayerData } from "../../../data/campaigns-data";
import { queryClient } from "../../../lib/react-query";
import { FaSearch } from "react-icons/fa";

export const CampaignsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: campaigns } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaignsAsPlayerData(queryClient),
  });

  const filteredCampaigns = campaigns?.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return campaigns ? (
    <div className="bg-red-bordo min-h-full text-white-text font-oswald text-[1.7rem]">
      <div className="px-20 gap-y-10 flex flex-col py-10">
        <div className="grid grid-cols-3 items-center justify-center">
          <div className="flex w-full">
            <div className="w-full flex-col">
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-white-text placeholder:text-white-text bg-transparent focus:outline-none"
              />
              <div className="w-full h-[1px] drop-shadow-xl bg-white-text"></div>
            </div>
            <FaSearch />
          </div>
          <div className="text-center ">
            <span className="bg-black p-1 rounded-2xl border-2 border-border-red hover:border-border-red-hover hover:text-[1.75rem] duration-300 drop-shadow-lg ">
              Participar de uma Campanha
            </span>
          </div>
          <div className="text-center">
            <span className="bg-black p-1 rounded-2xl border-2 border-border-red hover:border-border-red-hover hover:text-[1.75rem] duration-300 drop-shadow-md">
              Criar Campanha
            </span>
          </div>
        </div>
        <h1 className="underline">Campanhas:</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-20 ">
          {filteredCampaigns && filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <CampaignViewPortrait key={campaign.id} campaign={campaign} />
            ))
          ) : (
            <div className="absolute -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2">
              <h1 className="text-4xl font-oswald">
                Nenhuma campanha encontrada!
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-full bg-red-bordo flex text-4xl w-full justify-center items-center ">
      Carregando...
    </div>
  );
};

export default CampaignsPage;
