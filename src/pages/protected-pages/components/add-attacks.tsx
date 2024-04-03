import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { z } from "zod";
import { addAttack } from "../../../data/character-data";
import { useState } from "react";
interface Props {
  characterId: string;
}
const createAttackSchema = z.object({
  name: z.string().max(255),
  quantityOfRollingDices: z.coerce.number().gte(1).lte(100),
  rollModifier: z.coerce.number(),
  quantityOfDamageDices: z.coerce.number().gte(0).lte(100),
  damageDie: z.coerce.number().gte(0).lte(100),
  damageModifier: z.coerce.number().gte(0),
  criticalRoll: z.coerce.number().gte(0),
  criticalDies: z.coerce.number().gte(0).lte(100),
});

type CreateAttackSchema = z.infer<typeof createAttackSchema>;
function AddAttack({ characterId }: Props) {
  const { register, handleSubmit } = useForm<CreateAttackSchema>({
    resolver: zodResolver(createAttackSchema),
  });
  const [selectButton, setSelectButton] = useState(true);
  async function handleCreateAttack(data: CreateAttackSchema) {
    await addAttack(data, characterId);
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="mt-1  w-fit justify-center flex">
        <h1 className="w-fit bg-gray-700 p-2 rounded-lg hover:bg-gray-500">
          Adicionar ataque
        </h1>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70" />
        <Dialog.Content className="border-1 bg-login-gray rounded-md p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-oswald flex flex-col items-center justify-center">
          <Dialog.Close className="top-2 right-2 absolute z-50 hover:scale-125">
            <IoMdCloseCircleOutline className="text-3xl" />
          </Dialog.Close>
          <form
            onSubmit={handleSubmit(handleCreateAttack)}
            className="min-w-[300px] min-h-fit flex flex-col gap-y-2"
          >
            <h1>Nome</h1>
            <input
              {...register("name")}
              className="w-full bg-white p-2 rounded-lg text-black"
            />
            <h1>Quantidade de dados de rolagem</h1>
            <input
              {...register("quantityOfRollingDices")}
              className="w-full bg-white p-2 rounded-lg text-black"
            />
            <h1>Modificador de rolagem</h1>
            <input
              {...register("rollModifier")}
              className="w-full bg-white p-2 rounded-lg text-black"
            />
            <h1>Quantidade de dados de dano</h1>
            <input
              {...register("quantityOfDamageDices")}
              className="w-full bg-white p-2 rounded-lg text-black"
            />
            <h1>Dado de dano</h1>
            <input
              {...register("damageDie")}
              className="w-full bg-white p-2 rounded-lg text-black"
            />
            <h1>Modificador de dano</h1>
            <input
              {...register("damageModifier")}
              className="w-full bg-white p-2 rounded-lg text-black"
            />
            <h1>Valor de crítico</h1>
            <input
              {...register("criticalRoll")}
              className="w-full bg-white p-2 rounded-lg text-black"
            />
            <h1>Quantidade de dados de crítico</h1>
            <input
              {...register("criticalDies")}
              className="w-full bg-white p-2 rounded-lg text-black"
            />

            <button
              type="submit"
              className={`w-full  p-2 rounded-lg  mt-5 ${
                selectButton ? "bg-gray-700 hover:bg-gray-900" : "bg-gray-900 "
              }`}
              disabled={!selectButton}
            >
              Adicionar ataque
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddAttack;
