import * as Dialog from "@radix-ui/react-dialog";
import { Skill } from "../../../../types/skill.entity";
import { FaDiceD20 } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface SkillProps {
  skills: Skill[];
  dex: number;
  vig: number;
  int: number;
  str: number;
  pre: number;
}

const getAttributeLabel = (attribute: string) => {
  switch (attribute) {
    case "FOR":
      return "(For)";
    case "DEX":
      return "(Agi)";
    case "VIG":
      return "(Vig)";
    case "INT":
      return "(Int)";
    case "PRE":
      return "(Pre)";
    default:
      return attribute;
  }
};

const getSpecializationLabel = (specialization: string) => {
  switch (specialization) {
    case "NONE":
      return "Nenhuma";
    case "TRAINED":
      return "Treinado";
    case "EXPERT":
      return "Expert";
    case "VETERAN":
      return "Veterano";
    default:
      return specialization;
  }
};

export const SkillsView = ({ skills, dex, int, pre, str, vig }: SkillProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [rolls, setRolls] = useState<number[]>([]);
  const [showRolls, setShowRolls] = useState(false);
  const [highestRoll, setHighestRoll] = useState<number>(0);

  function rollDie() {
    if (selectedSkill === null) return;
    let roll = 0;
    let highestRoll = 0;
    const tempRolls: number[] = [];

    let dicesToRoll = 0;

    switch (selectedSkill?.atribute) {
      case "DEX":
        dicesToRoll = dex;
        break;
      case "VIG":
        dicesToRoll = vig;
        break;
      case "INT":
        dicesToRoll = int;
        break;
      case "FOR":
        dicesToRoll = str;
        break;
      case "PRE":
        dicesToRoll = pre;
        break;
    }

    for (let i = 0; i < dicesToRoll; i++) {
      roll = Math.floor(Math.random() * 20) + 1;
      tempRolls.push(roll);
      if (roll > highestRoll) {
        highestRoll = roll;
      }
    }

    setRolls(tempRolls);
    setHighestRoll(highestRoll + selectedSkill?.numberModifier);
  }

  useEffect(() => {
    if (selectedSkill !== null) {
      rollDie();
    }
  }, [selectedSkill]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedSkill(null);
    }
  }, [isOpen]);
  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <div className="rounded-lg py-2">
        <table className="text-[1.3rem] rounded-lg">
          <thead className="border-b-2 border-gray-200 px-2">
            <tr>
              <th className="px-2">Nome</th>
              <th className="px-2">Especialização</th>
              <th className="px-2">Bônus</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {skills.map((skill, index) => (
              <tr
                key={index}
                className="hover:bg-gray-600 rounded-lg cursor-pointer"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <td className="px-2">
                  {skill.name} {getAttributeLabel(skill.atribute)}
                </td>
                <td className="px-2">
                  {getSpecializationLabel(skill.specialization)}
                </td>
                <td className="px-2">{skill.numberModifier}</td>
                <td>
                  <Dialog.Trigger
                    className="px-2"
                    onClick={() => {
                      setSelectedSkill(skill);
                    }}
                  >
                    <FaDiceD20 />
                  </Dialog.Trigger>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-40 inset-0 bg-black/70" />
        <Dialog.Content className="border-1 z-50 min-w-[250px] bg-login-gray rounded-md p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-oswald flex flex-col items-center justify-center">
          <Dialog.Close className="top-2 right-2 absolute z-50 hover:scale-125">
            <IoMdCloseCircleOutline className="text-3xl" />
          </Dialog.Close>
          <div className="w-full flex flex-col gap-y-2 text-3xl gap-x-5">
            <div className="text-center underline text-3xl font-mono">
              <h1>{selectedSkill?.name}</h1>
            </div>
            <div className="w-full text-center">
              <span>{highestRoll}</span>
            </div>
          </div>
          <button className="mt-5">
            <FaDiceD20 className="text-4xl" onClick={rollDie} />
          </button>
          {selectedSkill && (
            <span className="text-gray-400 mt-2">
              {highestRoll - selectedSkill?.numberModifier} +{" "}
              {selectedSkill?.numberModifier}
            </span>
          )}
          <div className="mt-2 w-full text-center ">
            <div
              className="cursor-pointer underline "
              onClick={() => setShowRolls(!showRolls)}
            >
              {showRolls ? "Esconder rolagens" : "Mostrar rolagens"}
            </div>
            <div className="w-full text-center items-center ">
              {showRolls && (
                <div className="flex flex-wrap justify-center">
                  {rolls.map((roll, index) => (
                    <div key={index} className="m-2">
                      {roll}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
