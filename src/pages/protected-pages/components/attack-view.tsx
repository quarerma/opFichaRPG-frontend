import { Attacks } from "../../../types/character.entity";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { FaDiceD20 } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface AttackViewProps {
  attack: Attacks;
}

function AttackView({ attack }: AttackViewProps) {
  const [dieRoll, setDieRoll] = useState<number>(0);
  const [damageRoll, setDamageRoll] = useState<number>(0);

  function rollDie() {
    let roll = 0;
    let highestRoll = 0;
    for (let i = 0; i < attack.quantityOfRollingDices; i++) {
      roll = Math.floor(Math.random() * 20) + 1;
      console.log("dado " + i + ": " + roll); 
      if (roll > highestRoll) {
        highestRoll = roll;
      }
    }
    setDieRoll(highestRoll + attack.rollModifier);

    let damage = 0;
    if (highestRoll >= attack.criticalRoll && attack.criticalRoll != 0) {
      for (let i = 0; i < attack.criticalDies; i++) {
        damage += Math.floor(Math.random() * attack.damageDie) + 1;
      
      }
    } else {
      for (let i = 0; i < attack.quantityOfDamageDices; i++) {
        damage += Math.floor(Math.random() * attack.damageDie) + 1;
      }
    }
    setDamageRoll(damage + attack.damageModifier);
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="w-full bg-login-gray h-fit px-2 rounded-lg overflow-auto hover:bg-gray-600"
        onClick={rollDie}
      >
        <div className="grid grid-cols-4 w-full text-start">
          <h1 className="px-2 flex">
            <FaDiceD20 className="mt-1 m-1" /> {attack.name}
          </h1>
          {attack.rollModifier != 0 ? (
            <h1>
              Rolagem: {attack.quantityOfRollingDices}d20 +{" "}
              {attack.rollModifier}
            </h1>
          ) : (
            <h1>Rolagem: {attack.quantityOfRollingDices}d20</h1>
          )}

          {attack.damageModifier != 0 ? (
            <h1 className="text-center">
              Dano: {attack.quantityOfDamageDices}d{attack.damageDie} +{" "}
              {attack.damageModifier}
            </h1>
          ) : (
            <h1 className="text-center">
              Dano: {attack.quantityOfDamageDices}d{attack.damageDie}
            </h1>
          )}
          {attack.criticalRoll != 0 &&
            (attack.damageModifier != 0 ? (
              <h1>
                Crítico: {attack.criticalDies}d{attack.criticalRoll} +{" "}
                {attack.damageModifier}
              </h1>
            ) : (
              <h1>
                Crítico: {attack.criticalDies}d{attack.criticalRoll}
              </h1>
            ))}
        </div>

        <div className="h-[1px] w-full mt-1 bg-white"></div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-40 inset-0 bg-black/70" />
        <Dialog.Content className="border-1 z-50 bg-login-gray rounded-md p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-oswald flex flex-col items-center justify-center">
          <Dialog.Close className="top-2 right-2 absolute z-50 hover:scale-125">
            <IoMdCloseCircleOutline className="text-3xl" />
          </Dialog.Close>
          <div className="w-full flex flex-col gap-y-2 text-3xl gap-x-5">
            <div className="text-center underline text-3xl font-mono">
              <h1>{attack.name}</h1>
            </div>
            <div className="flex gap-x-10">
              <div className="flex flex-col">
                <span>Dado</span>
                <span className="text-center mt-2 text-4xl font-mono">
                  {dieRoll - attack.rollModifier}
                </span>
              </div>
              <div className="flex flex-col">
                <span>Rolagem</span>
                <span className="text-center mt-2 text-4xl font-mono">
                  {dieRoll}
                </span>
              </div>
              <div className="flex flex-col">
                <span>Dano</span>
                <span className="text-center mt-2 text-4xl font-mono">
                  {damageRoll}
                </span>
              </div>
            </div>
          </div>
          <button className="mt-5">
            <FaDiceD20 className="text-4xl" onClick={rollDie} />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AttackView;
