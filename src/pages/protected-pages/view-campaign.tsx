import { useParams } from "react-router-dom";
import { checkIfUserIsDM } from "../../auth/campaign.auth";
import { useState } from "react";
import ViewCampaignAsPlayer from "./components/view-campaign-player";

function ViewCampaign() {
  const campaignId = useParams().id;
  const [isDM, setIsDM] = useState<boolean | undefined>(undefined);

  async function checkIfUser(campaignId?: string) {
    const response = await checkIfUserIsDM(campaignId);
    setIsDM(response);
  }

  checkIfUser(campaignId);

  if (isDM === undefined) {
    return (
      <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div>
      {isDM ? (
        <h1>Você é o mestre dessa campanha</h1>
      ) : (
        <ViewCampaignAsPlayer />
      )}
    </div>
  );
}

export default ViewCampaign;
