import { useForm } from "react-hook-form";
import { Character } from "../../../../types/character.entity";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Skill } from "../../../../types/skill.entity";
import { updateCharacterSkills } from "../services/skill-service";

interface EditSkillsProps {
  character: Character;
}
interface FormData {
  skills: Skill[];
}
export const EditSkills = ({ character }: EditSkillsProps) => {
  const { register, handleSubmit } = useForm<FormData>();
  const queryClient = useQueryClient();
  const { id: campaignId } = useParams();

  const onSubmit = (data: FormData) => {
    const updatedSkills = data.skills.map((updatedSkill, index) => {
      return {
        ...character.skills[index],
        ...updatedSkill,
      };
    });

    handleUpdateSkills(updatedSkills);
  };

  async function handleUpdateSkills(data: Skill[]) {
    try {
      const skillsOnString: string[] = [];
      // prettier-ignore
      data.forEach((skill : Skill) => {
          skillsOnString.push(skill.name + "#" + skill.atribute + "#" + skill.specialization + "#" + skill.numberModifier);
        });

      // prettier-ignore
      const updatedChar = await updateCharacterSkills(skillsOnString, character?.id);

      queryClient.setQueryData(
        ["playerCharacter", campaignId],
        (prevCharacter?: Character) => {
          if (!prevCharacter) return prevCharacter;

          return updatedChar?.data;
        }
      );
      queryClient.invalidateQueries({ queryKey: ["playerCharacter"] });
      toast.success("Perícias atualizadas com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar personagem:", error);
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(onSubmit)(event);
  };

  return (
    <div className="bg-login-gray p-5 rounded-md">
      <form onSubmit={handleFormSubmit}>
        <table className="w-fit px-2">
          <thead className="border-b-2 border-gray-200 px-2 py-2">
            <tr>
              <th>Perícia</th>
              <th>Bônus</th>
              <th>Trainamento</th>
            </tr>
          </thead>
          <tbody>
            {character.skills.map((skill, index) => (
              <tr key={index} className="text-black ">
                <td className="text-white">{skill.name}</td>
                <td className="px-2 w-fit">
                  <input
                    {...register(`skills.${index}.numberModifier`)}
                    defaultValue={skill.numberModifier}
                    type="number"
                    className="border-2 border-gray-200 p-1"
                  />
                </td>
                <td className="px-2">
                  <select
                    {...register(`skills.${index}.specialization`)}
                    defaultValue={skill.specialization}
                    className="border-2 border-gray-200 text-center  text-black"
                  >
                    <option value="NONE" className="bg-gray-400">
                      Nenhum
                    </option>
                    <option value="TRAINED" className="bg-gray-400">
                      Treinado
                    </option>
                    <option value="EXPERT" className="bg-gray-400">
                      Expert
                    </option>
                    <option value="VETERAN" className="bg-gray-400">
                      Veterano
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="bg-gray-400 p-2 rounded-lg hover:bg-gray-200 mt-2 items-center w-full"
        >
          Atualizar Perícias
        </button>
      </form>
    </div>
  );
};
