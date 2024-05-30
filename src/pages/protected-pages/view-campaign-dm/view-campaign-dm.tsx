import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { checkIfUserIsDM } from "../../../auth/campaign.auth";
import HomeLogOff from "../../global-components/home-and-logoff";
import { getAllCharactersFromCampaign } from "../../../data/campaigns-data";
import { Character } from "../../../types/character.entity";
import CharacterPortraitDM from "./components/character-portrait-dm";

function ViewCampaignDM() {
  const campaignId = useParams().id;
  const queryClient = useQueryClient();

  const { data: isDm, isLoading } = useQuery({
    queryKey: ["isDM", campaignId],
    queryFn: () => checkIfUserIsDM(queryClient, campaignId),
  });

  const { data: characters } = useQuery({
    queryKey: ["charactersCampaign", campaignId],
    queryFn: () => getAllCharactersFromCampaign(queryClient, campaignId),
  });

  console.log(characters);
  if (isLoading) {
    return (
      <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
        Carregando...
      </div>
    );
  }

  if (!isDm) {
    return (
      <div className="w-screeen h-screen bg-red-bordo flex justify-center font-oswald text-white text-3xl items-center">
        <div className="absolute w-screen h-screen">
          <HomeLogOff />
        </div>
        <h1>Você não é o mestre dessa campanha</h1>
      </div>
    );
  }
  return (
    <div className="min-w-screen min-h-screen bg-red-bordo text-white font-oswald text-2xl flex flex-col justify-center items-center">
      <div className="absolute w-screen h-screen">
        <HomeLogOff />
      </div>

      <h1 className="text-3xl w-full text-center">PERSONAGENS:</h1>

      {characters?.length ? (
        characters.map((character: Character) => (
          <CharacterPortraitDM character={character} />
        ))
      ) : (
        <h1 className="text-3xl mt-10">NENHUM PERSONAGEM CADASTRADO</h1>
      )}
    </div>
  );
}

export default ViewCampaignDM;
