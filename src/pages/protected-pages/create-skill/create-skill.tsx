import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BASE_URL } from "../../../env";
import { useState } from "react";

const createSkillSchema = z.object({
  name: z.string(),
  description: z.string(),
  only_trained: z.boolean(),
  carry_peanalty: z.boolean(),
  needs_kit: z.boolean(),
  is_custom: z.boolean(),
});

type CreateSkillSchema = z.infer<typeof createSkillSchema>;

export const CreateSkill = () => {
  const [skills, setSkills] = useState<CreateSkillSchema[] | null>(null);

  const { register, handleSubmit } = useForm<CreateSkillSchema>({
    resolver: zodResolver(createSkillSchema),
  });

  async function handleCreateSkill(data: CreateSkillSchema) {
    await axios.post(`${BASE_URL}skills/create`, data);
  }

  async function handleGetSkills() {
    const response = await axios.get(`${BASE_URL}skills/getSkills`);
    setSkills(response.data);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateSkill)}
        className="flex flex-col bg-gray-50 items-center w-screen h-screen space-y-10"
      >
        <label className="flex flex-col w-full items-center">
          Nome
          <input {...register("name")} type="text" />
        </label>
        <label className="flex flex-col w-full h-full items-center">
          Descrição
          <textarea {...register("description")} className="w-[50%] h-full" />
        </label>
        <label className="flex flex-col w-full items-center">
          Apenas treinados
          <input {...register("only_trained")} type="checkbox" />
        </label>
        <label className="flex flex-col w-full items-center">
          Penalidade de carga
          <input {...register("carry_peanalty")} type="checkbox" />
        </label>
        <label className="flex flex-col w-full items-center">
          Necessita kit
          <input {...register("needs_kit")} type="checkbox" />
        </label>
        <label className="flex flex-col w-full items-center">
          Personalizada
          <input {...register("is_custom")} type="checkbox" />
        </label>
        <button type="submit">Criar</button>
      </form>

      <button onClick={handleGetSkills}>Buscar</button>
      <div>
        {skills && skills.length > 0 ? (
          skills.map((skill) => (
            <div key={skill.name}>
              <h1>{skill.name}</h1>
              <p>
                {skill.description.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhuma habilidade encontrada.</p>
        )}
      </div>
    </>
  );
};

export default CreateSkill;
