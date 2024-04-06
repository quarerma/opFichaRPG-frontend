import { useNavigate, useParams } from "react-router-dom";
import { getPlayerCharacter } from "../../../data/campaigns-data";
import HomeLogOff from "./home-and-logoff";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AttackView from "./attack-view";
import AddAttack from "./add-attacks";
import UpdateStats from "./update-stats";
import { useState } from "react";

function ViewCampaignAsPlayer() {
  const { id: campaignId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: character, isLoading } = useQuery({
    queryKey: ["playerCharacter", campaignId],
    queryFn: () => getPlayerCharacter(queryClient, campaignId),
  });

  const [temporaryHitPoints, setTemporaryHitPoints] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTemporaryHitPoints = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value) && value + temporaryHitPoints >= 0) {
      setTemporaryHitPoints((prevPoints) => prevPoints + value);
      setInputValue("");
    }
    if (!(value + temporaryHitPoints >= 0)) {
      setTemporaryHitPoints(0);
    }
  };

  // Verificar se a página está carregando
  if (isLoading) {
    return (
      <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
        Carregando...
      </div>
    );
  }

  if (character && campaignId) {
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
          <div className="w-[280px] bg-login-gray p-4 rounded-lg flex flex-col gap-y-5 ">
            <span className="flex w-full justify-between">
              <div className="">
                Vida: {character.currentHitPoints}/{character.maxHitPoints}
              </div>
              <div className="relative">
                <UpdateStats statsType="HitPoints" character={character} />
              </div>
            </span>
            <span className="flex w-full justify-between">
              <div className="">
                PE: {character.currentEffortPoints}/{character.maxEffortPoints}
              </div>
              <div className="relative">
                <UpdateStats statsType="EffortPoints" character={character} />
              </div>
            </span>
            <span className="flex w-full justify-between">
              <div>
                Sanidade: {character.currentSanityPoints}/
                {character.maxSanityPoints}
              </div>
              <div className="relative">
                <UpdateStats statsType="SanityPoints" character={character} />
              </div>
            </span>
            <span className="flex w-full justify-between">
              <div>HP Float: {temporaryHitPoints} </div>
              <div className="flex items-center -space-x-1">
                <input
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-12 h-8 rounded-lg border-2 text-center border-black text-black"
                />
                <button
                  onClick={handleAddTemporaryHitPoints}
                  className="rounded-full bg-green-500  w-5 h-5 text-1xl z-10 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </span>
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
              <AddAttack characterId={character.id} campaignId={campaignId} />
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
