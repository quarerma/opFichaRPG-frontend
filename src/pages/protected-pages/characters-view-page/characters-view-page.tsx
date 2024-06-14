import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../lib/react-query";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUserCharacters } from "../../../data/character-data";
import { CharacterViewPortrait } from "./components/character-view-portrait";

export const CharactersPageView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: characters } = useQuery({
    queryKey: ["characters"],
    queryFn: () => getUserCharacters(queryClient),
  });

  const filteredCharacters = characters?.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return characters ? (
    <div className="bg-red-bordo min-h-full text-white-text font-oswald text-[1.5rem]">
      <div className="pl-20 gap-y-10 flex flex-col py-10">
        <div className="grid grid-cols-2 items-center justify-center">
          <div className="flex w-full">
            <div className="w-full flex-col">
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-white-text placeholder:text-white-text bg-transparent w-full focus:outline-none"
              />
              <div className="w-full h-[1px] drop-shadow-xl bg-white-text"></div>
            </div>
            <FaSearch />
          </div>

          <Link className="text-center" to={"/criar-personagem"}>
            <span className="bg-black p-1 rounded-2xl border-2 border-border-red hover:border-border-red-hover hover:text-[1.55rem] duration-300 drop-shadow-md">
              Novo Personagem
            </span>
          </Link>
        </div>
        <h1 className="underline text-[1.45rem]">Personagens:</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-20 ">
          {filteredCharacters && filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => (
              <CharacterViewPortrait key={character.id} character={character} />
            ))
          ) : (
            <div className="absolute -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2">
              <h1 className="text-4xl font-oswald">
                Nenhum personagem encontrado!
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-full bg-red-bordo flex text-4xl w-full justify-center items-center ">
      Carregando...
    </div>
  );
};

export default CharactersPageView;
