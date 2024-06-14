import { Link } from "react-router-dom";
import { Character } from "../../../../types/character.entity";

interface CharacterViewPortraitProps {
  character: Character;
}

export const CharacterViewPortrait = ({
  character,
}: CharacterViewPortraitProps) => {
  // Classes comuns para bordas e transições
  const commonBorderClasses =
    "border-2 border-border-red duration-300 group-hover:border-border-red-hover";
  const commonShadowClasses = "drop-shadow-2xl";

  return (
    <Link
      to={`/personagens/${character.id}`}
      className={`w-full text-[1.3rem] group bg-card-gray h-[300px] rounded-3xl font-oswald ${commonBorderClasses} ${commonShadowClasses} overflow-hidden flex flex-col transition-colors hover:border-border-red-hover`}
    >
      <div
        className={`bg-login-gray p-1 w-full text-[1.6rem] text-center rounded-tl-xl rounded-tr-xl ${commonBorderClasses}`}
      >
        <h1>{character.name}</h1>
      </div>
      <div className="p-2 mt-2 text-[1.2rem]">
        <h1>
          Classe: <span>{character.className}</span>
        </h1>
        <h1>
          Subclasse: <span>{character.subClassName}</span>
        </h1>
        <h1>
          Nível: <span>{character.level}</span>
        </h1>
        <h1 className="mt-2">
          Campanha: <span>{character.campaignName}</span>
        </h1>
      </div>
      <div
        className={`mt-auto text-xl w-fit p-2 bg-black-filter rounded-3xl ${commonBorderClasses} ${commonShadowClasses}  self-center mb-4`}
      >
        Ver Personagem
      </div>
    </Link>
  );
};
