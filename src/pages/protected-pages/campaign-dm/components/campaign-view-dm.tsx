import { Link } from "react-router-dom";
import { Campaign } from "../../../../types/campaign.entity";

interface CampaignViewPortraitProps {
  campaign: Campaign;
}

export const CampaignViewPortraitDM = ({
  campaign,
}: CampaignViewPortraitProps) => {
  return (
    <Link
      to={`/campanhas/mestre/${campaign.id}`}
      className="bg-login-gray rounded-3xl text-center overflow-hidden flex flex-col p-5 space-y-5 text-3xl"
    >
      <h1 className="underline">{campaign.name}</h1>
      <span className="text-2xl">{campaign.description}</span>
    </Link>
  );
};

export default CampaignViewPortraitDM;
