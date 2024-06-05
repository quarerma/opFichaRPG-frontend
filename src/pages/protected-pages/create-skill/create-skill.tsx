import axios from "axios";
import { BASE_URL } from "../../../env";
import { useEffect, useState } from "react";
import { SkillDetail } from "../../../types/skill.entity";

export const EditSkill = () => {
  const [skills, setSkills] = useState<SkillDetail[] | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [description, setDescription] = useState<string>("");

  async function handleGetSkills() {
    const response = await axios.get(`${BASE_URL}skills/getSkills`);
    setSkills(response.data);
  }

  function handleSkillChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const skill =
      skills?.find((skill) => skill.name === e.target.value) || null;
    setSelectedSkill(skill);
  }

  function handleSaveSkill() {
    // implementar

    console.log(description);
    if (!description) return;

    axios.patch(`${BASE_URL}skills/updateDescription/${selectedSkill?.name}`, {
      description,
    });
  }

  useEffect(() => {
    if (selectedSkill) {
      setDescription(selectedSkill.description);
    }
  }, [selectedSkill]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar habilidades</h1>
      <label
        htmlFor="skill"
        className="block text-sm font-medium text-gray-700"
      >
        Habilidade
      </label>
      <select
        name="skill"
        id="skill"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleSkillChange}
      >
        {skills &&
          skills.map((skill) => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
      </select>
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        Descrição
      </label>
      <textarea
        name="description"
        id="description"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSaveSkill}
      >
        Salvar
      </button>
      <br />
      <button
        onClick={handleGetSkills}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Buscar
      </button>
      <div>
        {skills && skills.length > 0 ? (
          skills.map((skill) => (
            <div key={skill.name}>
              <h1 className="text-2xl font-extrabold">{skill.name}</h1>
              <p>
                {skill?.description.split("\n").map((line, index) => {
                  const lineWithBold = line.replace(
                    /{(.*?)}/g,
                    "<strong>$1</strong>"
                  );
                  return (
                    <span
                      key={index}
                      className="text-[1.3rem] block mb-5 leading-7"
                      dangerouslySetInnerHTML={{ __html: lineWithBold }}
                    />
                  );
                })}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhuma habilidade encontrada</p>
        )}
      </div>
    </div>
  );
};
