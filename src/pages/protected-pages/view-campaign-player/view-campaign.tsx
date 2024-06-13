import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViewCampaignAsPlayer from "./view-campaign-player";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { checkIfUserIsDM } from "../../../auth/campaign.auth";
import ValidatePlayer from "../../global-components/wrap-validate-player";

function ViewCampaign() {
  const campaignId = useParams().id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: isDm, isLoading } = useQuery({
    queryKey: ["isDM", campaignId],
    queryFn: () => checkIfUserIsDM(queryClient, campaignId),
  });

  useEffect(() => {
    if (!isLoading && isDm) {
      navigate(`/campanhas/mestre/${campaignId}`);
    }
  }, [isDm, isLoading, navigate, campaignId]);

  if (isLoading) {
    return (
      <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div>
      <ValidatePlayer>
        <ViewCampaignAsPlayer />
      </ValidatePlayer>
    </div>
  );
}

export default ViewCampaign;
