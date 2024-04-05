import { Character } from "../../../types/character.entity";

interface CharacterPortraitDMProps {
  character: Character;
}

function CharacterPortraitDM({ character }: CharacterPortraitDMProps) {
  return (
    <div className="bg-login-gray flex gap-x-5 text-white font-oswald p-2 rounded-lg mt-2">
      <span>{character.name}</span>
      <span>
        Vida: {character.currentHitPoints}/{character.maxHitPoints}
      </span>
      <span>
        Sanidade: {character.currentSanityPoints}/{character.maxSanityPoints}
      </span>
      <span>
        PE: {character.currentEffortPoints}/{character.maxEffortPoints}
      </span>
    </div>
  );
}

export default CharacterPortraitDM;
