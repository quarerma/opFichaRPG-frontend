import { useQuery } from "@tanstack/react-query";
import { checkIfPlayerIsInCampaign } from "../../../auth/campaign.auth";
import { queryClient } from "../../../lib/react-query";
import { useParams } from "react-router-dom";
import HomeLogOff from "./home-and-logoff";

interface ValidatePlayerProps {
  children: React.ReactNode;
}

export const ValidatePlayer = ({ children }: ValidatePlayerProps) => {
  const campaignId = useParams().id;
  const { data: isPlayer, isLoading } = useQuery({
    queryKey: ["isPlayer", campaignId],
    queryFn: () => checkIfPlayerIsInCampaign(queryClient, campaignId),
  });

  if (isLoading) {
    return (
      <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
        Carregando...
      </div>
    );
  }

  if (!isPlayer) {
    return (
      <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
        <div className="absolute w-full h-full">
          <HomeLogOff />
        </div>
        Você não está nessa campanha
      </div>
    );
  }

  return <>{children}</>;
};

export default ValidatePlayer;
