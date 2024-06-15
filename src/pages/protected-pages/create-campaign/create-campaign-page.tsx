import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BASE_URL } from "../../../env";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const campaignFilterSchema = z.object({
  name: z.string().min(3).max(20).trim(),
  description: z.string().min(3).max(255).trim(),
  password: z.string().min(3).max(255),
});

type CampaignFilterSchema = z.infer<typeof campaignFilterSchema>;

export function CreateCampaign() {
  const [selectButton, setSelectButton] = useState(true);
  const { register, handleSubmit } = useForm<CampaignFilterSchema>({
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

  const baseInputClass =
    "p-2 bg-login-gray focus:outline-none focus:ring text-2xl rounded-lg";
  const focusRingClass = "focus:ring-border-red-hover";
  const textClass = "";
  const widthClass = "w-[40%]";

  return (
    <div className="h-[92vh] w-full bg-red-bordo text-white-text font-oswald flex flex-col justify-center items-center">
      <h1 className="w-[70%] text-4xl mb-5">Criar Campanha</h1>
      <form className="w-[70%] h-[70%] p-10 bg-card-gray border-4 rounded-lg border-border-red flex flex-col gap-y-3 hover:border-border-red-hover">
        <h1 className="text-3xl">Nome*</h1>
        <input
          className={`${baseInputClass} ${widthClass} ${focusRingClass} ${textClass}`}
          type="text"
          {...register("name")}
        />
        <h1 className="text-3xl">Senha*</h1>
        <input
          className={`${baseInputClass} ${widthClass} ${focusRingClass} ${textClass}`}
          type="password"
          {...register("password")}
        />
        <h1 className="text-3xl">Descrição*</h1>
        <textarea
          className={`${baseInputClass} h-full ${focusRingClass} ${textClass}`}
          {...register("description")}
        />
        <div className="flex justify-end items-center gap-x-20">
          <Link to={"/campanhas"} className="inline-block align-middle">
            <span className="text-2xl text-gray-500 hover:text-[1.6rem] duration-300 hover:text-white-text">
              Cancelar
            </span>
          </Link>
          <button
            type="submit"
            className="bg-black px-2 py-1 rounded-2xl border-2 border-border-red text-2xl hover:border-border-red-hover hover:text-[1.6rem] duration-300 drop-shadow-md"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
