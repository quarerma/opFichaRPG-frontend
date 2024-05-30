import { useNavigate, useParams } from "react-router-dom";
import { checkIfUserIsDM } from "../../auth/campaign.auth";
import ViewCampaignAsPlayer from "./components/view-campaign-player";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ValidatePlayer from "./components/wrap-validate-player";

function ViewCampaign() {
  const campaignId = useParams().id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: isDm, isLoading } = useQuery({
    queryKey: ["isDM", campaignId],
    queryFn: () => checkIfUserIsDM(queryClient, campaignId),
  });

  if (isLoading) {
    return (
      <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
        Carregando...
      </div>
    );
  }

  if (isDm) navigate(`/campanhas/mestre/${campaignId}`);
  return (
    <div>
      <ValidatePlayer>
        <ViewCampaignAsPlayer />
      </ValidatePlayer>
    </div>
  );
}

export default ViewCampaign;
