import { Link } from "react-router-dom";
import { Campaign } from "../../../../types/campaign.entity";

interface CampaignViewPortraitProps {
  campaign: Campaign;
}

export const CampaignViewPortrait = ({
  campaign,
}: CampaignViewPortraitProps) => {
  return (
    <Link
      to={`/campanhas/view/${campaign.id}`}
      className="bg-card-gray rounded-3xl font-oswald text-center border-4 group border-border-red  hover:border-border-red-hover drop-shadow-2xl overflow-hidden flex flex-col justify-between text-3xl h-[400px]"
    >
      <div>
        <div className="bg-login-gray p-3 w-full rounded-tl-xl rounded-tr-xl border-b-2  border-border-red  group-hover:border-border-red-hover">
          <h1 className="text-3xl">{campaign.name}</h1>
        </div>
        <div className="text-start p-4 w-full text-[1.2rem] flex-col ">
          <h1>Mestre: {campaign.gameMasterName}</h1>
          <p className="mt-1 text-[1.0rem] leading-6">
            Descrição: {campaign.description}
          </p>
        </div>
      </div>
      <div className="text-xl w-fit  p-2 bg-black-filter rounded-3xl border-2 border-border-red group-hover:border-border-red-hover drop-shadow-2xl self-center mb-4">
        Ver Campanha
      </div>
    </Link>
  );
};

export default CampaignViewPortrait;
