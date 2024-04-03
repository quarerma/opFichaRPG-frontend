import { useNavigate, useParams } from "react-router-dom";
import { getPlayerCharacter } from "../../../data/campaigns-data";
import HomeLogOff from "./home-and-logoff";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AttackView from "./attack-view";
import AddAttack from "./add-attacks";

function ViewCampaignAsPlayer() {
  const { id: campaignId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { data: character, isLoading } = useQuery({
    queryKey: ["playerCharacter", campaignId],
    queryFn: async () => {
      const char = await getPlayerCharacter(campaignId); // Esperar a resposta da chamada assíncrona
      setLoading(false); // Atualizar o estado de carregamento após receber a resposta
      return char;
    },
  });

  // Verificar se a página está carregando
  if (isLoading || loading) {
    return (
      <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
        Carregando...
      </div>
    );
  }

  if (character) {
    return (
      <div className="min-w-screen min-h-screen bg-red-bordo text-white font-oswald text-2xl flex flex-col gap-y-2">
        <HomeLogOff />
        <div className="max-md:flex-col max-md:gap-y-5 flex w-fit mt-10 ml-10 rounded-lg gap-x-5">
          <div className=" w-[280px] bg-login-gray p-5 rounded-lg">
            Nome: {character.name}
            <br />
            Classe: {character.className}
            <br />
            Subclasse: {character.subClassName}
            <br />
            Nível: {character.level}
          </div>
          <div className="w-[280px] bg-login-gray p-5 rounded-lg">
            Vida: {character.currentHitPoints}/{character.maxHitPoints}
            <br />
            PE: {character.currentEffortPoints}/{character.maxEffortPoints}
            <br />
            Sanidade: {character.currentSanityPoints}/
            {character.maxSanityPoints}
          </div>
          <div className="bg-login-gray p-5 w-[280px] rounded-lg">
            Força : {character.strength}
            <br />
            Destreza : {character.dexterity}
            <br />
            Vitalidade : {character.vitality}
            <br />
            Inteligência : {character.intelligence}
            <br />
            Presença : {character.presence}
          </div>
        </div>
        <div className="max-w-[880px] min-h-fit bg-login-gray rounded-lg ml-10 p-2 text-center">
          <h1 className="underline mb-5">ATAQUES:</h1>
          <div className="text-1xl flex flex-col gap-y-5">
            {character.attacks.map((attack, index) => (
              <AttackView key={index} attack={attack} />
            ))}
            <div className="w-full justify-center items-center flex">
              <AddAttack characterId={character.id} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    navigate(`/campanhas/${campaignId}/criar-personagem`);
    return <></>; // Retorna um componente padrão enquanto a carga está em andamento
  }
}

export default ViewCampaignAsPlayer;
