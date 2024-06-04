import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { getPlayerCharacter } from "../../../../data/campaigns-data";
import { Character } from "../../../../types/character.entity";
import { EditSkills } from "../components/edit-skills";
import { useState } from "react";
import { updateCharacter } from "../services/update-service";

const updateCharacterSchema = z.object({
  name: z.string().max(255),
  className: z.string().max(255),
  subClassName: z.string().max(255),
  level: z.coerce.number().gte(1).lte(100),
  maxHitPoints: z.coerce.number().gte(1),
  maxSanityPoints: z.coerce.number().gte(1),
  maxEffortPoints: z.coerce.number().gte(1),
  strength: z.coerce.number().gte(0),
  dexterity: z.coerce.number().gte(0),
  vitality: z.coerce.number().gte(0),
  intelligence: z.coerce.number().gte(0),
  presence: z.coerce.number().gte(0),
});

export type UpdateCharacterSchema = z.infer<typeof updateCharacterSchema>;
export const EditCharacter = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { id: campaignId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: character } = useQuery({
    queryKey: ["playerCharacter", campaignId],
    queryFn: () => getPlayerCharacter(queryClient, campaignId),
  });
  const { register, handleSubmit } = useForm<UpdateCharacterSchema>({
    resolver: zodResolver(updateCharacterSchema),
  });

  async function handleUpdateCharacter(data: UpdateCharacterSchema) {
    try {
      const updatedChar = await updateCharacter(data, character?.id);

      queryClient.setQueryData(
        ["playerCharacter", campaignId],
        (prevCharacter?: Character) => {
          if (!prevCharacter) return prevCharacter;

          return updatedChar?.data;
        }
      );
      const updatedCharData = await getPlayerCharacter(queryClient, campaignId);
      console.log("personagem atualizado");
      console.log(updatedCharData);
      // queryClient.invalidateQueries({ queryKey: ["playerCharacter"] });
      toast.success("Personagem atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar personagem:", error);
    }
  }

  return character ? (
    <div className="min-w-screen min-h-screen bg-red-bordo text-white font-oswald text-2xl flex  gap-y-2 ">
      <form
        className="text-center items-center justify-center"
        onSubmit={handleSubmit(handleUpdateCharacter)}
      >
        <div className="max-md:flex-col max-md:gap-y-5 flex w-fit mt-10 ml-10 rounded-lg gap-x-5 text-start">
          <div className="flex-col w-full h-fit items-center">
            <div className="flex gap-x-5">
              {/* Edit Char Info */}
              <div className="w-[280px] bg-login-gray p-5 rounded-lg h-fit relative">
                <div className="w-full flex-col space-y-2">
                  <div className="flex-col">
                    <h1 className="text-center">Nome:</h1>
                    <input
                      defaultValue={character.name}
                      {...register("name")}
                      className="w-full p-1 rounded-md text-black"
                    />
                  </div>
                  <h1 className="text-center">Classe:</h1>
                  <input
                    defaultValue={character.className}
                    {...register("className")}
                    className="w-full p-1 rounded-md text-black"
                  />
                  <h1 className="text-center">Subclasse:</h1>
                  <input
                    defaultValue={character.subClassName}
                    {...register("subClassName")}
                    className="w-full p-1 rounded-md text-black"
                  />
                  <h1 className="text-center">Nível:</h1>
                  <input
                    defaultValue={character.level}
                    {...register("level")}
                    className="w-full p-1 rounded-md text-black"
                  />
                </div>
              </div>

              {/* Edit Atributes */}
              <div className="bg-login-gray p-5 w-[280px] rounded-lg h-fit">
                <h1 className="text-center">Força:</h1>
                <input
                  defaultValue={character.strength}
                  {...register("strength")}
                  className="w-full p-1 rounded-md text-black"
                />
                <h1 className="text-center">Destreza:</h1>
                <input
                  defaultValue={character.dexterity}
                  {...register("dexterity")}
                  className="w-full p-1 rounded-md text-black"
                />
                <h1 className="text-center">Vitalidade:</h1>
                <input
                  defaultValue={character.vitality}
                  {...register("vitality")}
                  className="w-full p-1 rounded-md text-black"
                />
                <h1 className="text-center">Inteligência:</h1>
                <input
                  defaultValue={character.intelligence}
                  {...register("intelligence")}
                  className="w-full p-1 rounded-md text-black"
                />
                <h1 className="text-center">Presença:</h1>
                <input
                  defaultValue={character.presence}
                  {...register("presence")}
                  className="w-full p-1 rounded-md text-black"
                />
              </div>

              {/* Edit Stats */}
              <div className="bg-login-gray p-5 w-[280px] rounded-lg flex-col h-fit">
                <div className="flex-col space-y-2">
                  <h1 className="text-center">Vida Máxima:</h1>
                  <input
                    defaultValue={character.maxHitPoints}
                    {...register("maxHitPoints")}
                    className="w-full p-1 rounded-md text-black"
                  />
                </div>
                <div className="flex-col space-y-2">
                  <h1 className="text-center">Sanidade Máxima:</h1>
                  <input
                    defaultValue={character.maxSanityPoints}
                    {...register("maxSanityPoints")}
                    className="w-full p-1 rounded-md text-black"
                  />
                </div>
                <div className="flex-col space-y-2">
                  <h1 className="text-center">PE Máximo:</h1>
                  <input
                    defaultValue={character.maxEffortPoints}
                    {...register("maxEffortPoints")}
                    className="w-full p-1 rounded-md text-black"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center ">
              <div className="flex flex-col ">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  title="*Atualiza apenas os campos acima"
                  type="submit"
                  className="mt-5 p-2 bg-blue-600 rounded-md hover:scale-110 duration-500"
                >
                  <h1>Atualizar</h1>
                </button>
                {showTooltip && (
                  <div className="p-2 mt-2  text-[1.0rem] rounded-md">
                    * Atualiza apenas os campos acima!
                  </div>
                )}
                <button
                  className="py-10 hover:scale-110 duration-700"
                  onClick={() => navigate(`/campanhas/view/${campaignId}`)}
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Edit Skills */}
      <div className="p-10">
        <EditSkills character={character} />
      </div>
      <Toaster />
    </div>
  ) : (
    <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
      Carregando...
    </div>
  );
};
export default EditCharacter;
