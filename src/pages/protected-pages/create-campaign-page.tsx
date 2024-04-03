import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BASE_URL } from "../../env";
import { useState } from "react";
import HomeLogOff from "./components/home-and-logoff";
import { useNavigate } from "react-router-dom";

const campaignFilterSchema = z.object({
  name: z.string().min(3).max(255).trim(),
  description: z.string().min(3).max(255).trim(),
  password: z.string().min(3).max(255),
});

type CampaignFilterSchema = z.infer<typeof campaignFilterSchema>;

export function CreateCampaign() {
  const [selectButton, setSelectButton] = useState(true);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(campaignFilterSchema),
  });

  const navigate = useNavigate();

  async function handleCreateCampaign(data: CampaignFilterSchema) {
    try {
      setSelectButton(false);
      const token: string | null = localStorage.getItem("jwt");
      const id = uuidv4();
      const newCampaign = {
        id,
        ...data,
      };

      const response = await axios.post(
        `${BASE_URL}campaigns/create`,
        newCampaign,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token} `,
          },
        }
      );

      console.log(response);

      console.log(newCampaign);
      setSelectButton(true);
      localStorage.setItem("successMessage", "Campanha criada com sucesso!");
      navigate("/mestrando");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-screen h-screen bg-red-bordo text-white font-oswald flex justify-center items-center">
      <div className="absolute h-screen w-screen">
        <HomeLogOff />
      </div>
      <form
        onSubmit={handleSubmit(handleCreateCampaign)}
        className="bg-login-gray items-center p-5 rounded-md text-center flex flex-col gap-y-2 z-10"
      >
        <h1 className="text-3xl mb-8">CRIAR CAMPANHA</h1>
        <h1>NOME DA CAMPANHA</h1>
        <input
          {...register("name")}
          type="text"
          className="w-full p-2 rounded-md text-black"
        />
        <h1>DESCRIÇÃO</h1>
        <textarea
          {...register("description")}
          className="w-full p-2  rounded-md text-black"
        />
        <h1>SENHA</h1>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 rounded-md text-black "
        />

        <button
          className={`p-2 rounded-2xl w-fit text-2xl mt-2 ${
            selectButton ? "bg-red-bordo hover:bg-red-950" : "bg-gray-900 "
          }`}
          disabled={!selectButton}
          type="submit"
        >
          Criar
        </button>
      </form>
    </div>
  );
}

export default CreateCampaign;
