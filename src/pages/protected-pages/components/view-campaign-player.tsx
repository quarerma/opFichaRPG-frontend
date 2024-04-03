import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlayerCharacter } from "../../../data/campaigns-data";
import { Character } from "../../../types/character.entity";
import HomeLogOff from "./home-and-logoff";

function ViewCampaignAsPlayer() {
  const { id: campaignId } = useParams();
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPlayerCharacter(campaignId)
      .then((response) => {
        setCharacter(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao obter personagem:", error);
        setLoading(false);
      });
  }, [campaignId]);

  if (loading) {
    return (
      <div className="bg-red-bordo w-screen h-screen flex fixed justify-center items-center text-3xl font-oswald text-white">
        Carregando...
      </div>
    );
  }

  if (character) {
    return (
      <div className="max-w-screen min-h-screen bg-red-bordo text-white font-oswald text-2xl flex flex-col gap-y-2">
        <HomeLogOff />
        <div className="flex w-fit mt-10 ml-10 rounded-lg gap-x-5">
          <div className=" w-[260px] bg-login-gray p-5 rounded-lg">
            Nome: {character.name}
            <br />
            Classe: {character.className}
            <br />
            Subclasse: {character.subClassName}
            <br />
            Nível: {character.level}
          </div>
          <div className="w-[260px] bg-login-gray p-5 rounded-lg">
            Vida: {character.currentHitPoints}/{character.maxHitPoints}
            <br />
            PE: {character.currentEffortPoints}/{character.maxEffortPoints}
            <br />
            Sanidade: {character.currentSanityPoints}/
            {character.maxSanityPoints}
          </div>
        </div>
        <div className="bg-login-gray p-5  w-[260px]  ml-10 rounded-lg">
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
    );
  }

  navigate(`/campanhas/${campaignId}/criar-personagem`);
  return <></>; // Retorna um componente padrão enquanto a carga está em andamento
}

export default ViewCampaignAsPlayer;
