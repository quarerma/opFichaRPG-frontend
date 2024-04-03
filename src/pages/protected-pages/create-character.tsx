import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { createCharacter } from "../../data/character-data";
import { useEffect, useState } from "react";
import HomeLogOff from "./components/home-and-logoff";
import { getPlayerCharacter } from "../../data/campaigns-data";

const createCharacterSchema = z.object({
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

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;
function CreateCharacter() {
  const { register, handleSubmit } = useForm<CreateCharacterSchema>({
    resolver: zodResolver(createCharacterSchema),
  });
  const [selectButton, setSelectButton] = useState(true);
  const navigate = useNavigate();
  const campaignId = useParams().id;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkCahracter = async () => {
      await getPlayerCharacter(campaignId)
        .then((response) => {
          if (response) {
            navigate(`/campanhas/view/${campaignId}`);
          }
        })

        .catch((error) => {
          console.error("Erro ao obter personagem:", error);
        });
    };
    checkCahracter();
    setLoading(false);
  }, []);

  async function handleCreateCharacter(data: CreateCharacterSchema) {
    setSelectButton(false);
    console.log(data);
    await createCharacter(data, campaignId);
    navigate(`/campanhas/view/${campaignId}`);
  }
  return loading ? (
    <div className="bg-red-bordo w-screen h-screen fixed justify-center items-center flex text-3xl font-oswald text-white">
      Carregando...
    </div>
  ) : (
    <div className="max-w-screen min-h-screen bg-red-bordo text-white font-oswald flex justify-center items-center flex-col">
      <div className="w-full">
        <HomeLogOff />
      </div>
      <form
        onSubmit={handleSubmit(handleCreateCharacter)}
        className="bg-login-gray items-center p-5 rounded-md text-center flex flex-col gap-y-2  text-3xl m-5 mt-10"
      >
        <h1>Nome</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("name")}
        />
        <h1>Classe</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("className")}
        />
        <h1>Subclasse</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("subClassName")}
        />
        <h1>Nível</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("level")}
        />
        <h1>Força</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("strength")}
        />
        <h1>Destreza</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("dexterity")}
        />
        <h1>Vitalidade</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("vitality")}
        />
        <h1>Inteligência</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("intelligence")}
        />
        <h1>Presença</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("presence")}
        />
        <h1>Pontos de vida</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("maxHitPoints")}
        />
        <h1>Pontos de sanidade</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("maxSanityPoints")}
        />
        <h1>Pontos de esforço</h1>
        <input
          className="w-full p-2 rounded-md text-black"
          {...register("maxEffortPoints")}
        />

        <button
          type="submit"
          className={`p-2 rounded-2xl w-fit text-2xl mt-2 ${
            selectButton ? "bg-red-bordo hover:bg-red-950" : "bg-gray-900 "
          }`}
          disabled={!selectButton}
        >
          Criar Personagem
        </button>
      </form>
    </div>
  );
}

export default CreateCharacter;
