import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateStats } from "../../../data/character-data";
import { Character } from "../../../types/character.entity";

interface UpdateStatsProps {
  statsType: string;
  character: Character;
}

const updateAttack = z.object({
  value: z.coerce.number().gte(1),
});

type UpdateAttack = z.infer<typeof updateAttack>;

function UpdateStats({ statsType, character }: UpdateStatsProps) {
  const [positive, setPositive] = useState<boolean>(true);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<UpdateAttack>({
    resolver: zodResolver(updateAttack),
  });

  const { mutateAsync: updateStatValueFn } = useMutation({
    mutationFn: async (data: number) =>
      await updateStats(character.id, data.toString(), statsType), // Passando characterId e statsType como argumentos
    onSuccess(_, variables, context) {
      const cachedData: Character | undefined = queryClient.getQueryData([
        "playerCharacter",
        character.campaignId,
      ]);

      if (cachedData) {
        if (statsType === "SanityPoints") {
          cachedData.currentSanityPoints = variables;
        } else if (statsType === "HitPoints") {
          cachedData.currentHitPoints = variables;
        } else if (statsType === "EffortPoints") {
          cachedData.currentEffortPoints = variables;
        }
        queryClient.resetQueries({
          queryKey: ["playerCharacter", character.campaignId],
          exact: true,
        });

        queryClient.setQueryData(
          ["playerCharacter", character.campaignId],
          cachedData
        );
      }

      reset();
    },
  });

  async function handleUpdateAttack(data: UpdateAttack) {
    let value;

    if (positive) {
      value = data.value;
    } else {
      value = -data.value;
    }

    if (statsType === "SanityPoints") {
      value = character.currentSanityPoints + value;
      if (value > character.maxSanityPoints) {
        value = character.maxSanityPoints;
      }
    } else if (statsType === "HitPoints") {
      value = character.currentHitPoints + value;
      if (value > character.maxHitPoints) {
        value = character.maxHitPoints;
      }
    } else if (statsType === "EffortPoints") {
      value = character.currentEffortPoints + value;
      if (value > character.maxEffortPoints) {
        value = character.maxEffortPoints;
      }
      if (value < 0) {
        value = 0;
      }
    }

    if (value < 0) {
      value = 0;
    }

    try {
      updateStatValueFn(value); // Chamar a função updateStatValueFn com o valor positivo ou negativo
    } catch (error) {
      console.error("Erro ao atualizar ataque:", error);
    }

    setPositive(false);
  }
  return (
    <form
      className="flex items-center justify-center -space-x-1"
      onSubmit={handleSubmit(handleUpdateAttack)}
    >
      <button
        onClick={() => setPositive(false)}
        className="rounded-full bg-red-500 w-5 h-5 z-10 text-1xl flex items-center justify-center"
      >
        <span className="block">-</span>
      </button>
      <input
        {...register("value")}
        type="text"
        className={`w-12 rounded-lg text-center focus:outline-none ${
          statsType === "HitPoints"
            ? "border-2 border-green-500 text-green-600"
            : statsType === "EffortPoints"
            ? "border-2 border-yellow-500 text-yellow-600"
            : statsType === "SanityPoints"
            ? "border-2 border-blue-500 text-blue-600"
            : ""
        }`}
      />

      <button
        onClick={() => setPositive(true)}
        className="rounded-full bg-green-500 w-5 h-5 text-1xl z-10 flex items-center justify-center"
      >
        +
      </button>
    </form>
  );
}

export default UpdateStats;
