import { Skill } from "../../../../types/skill.entity";

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

export const SkillsView = ({ skills }: SkillProps) => {
  return (
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
            >
              <td className="px-2">
                {skill.name} {getAttributeLabel(skill.atribute)}
              </td>
              <td className="px-2">
                {getSpecializationLabel(skill.specialization)}
              </td>
              <td className="px-2">{skill.numberModifier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
