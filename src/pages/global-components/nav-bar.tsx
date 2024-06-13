import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getUserData } from "../../data/user-data";
import { Link } from "react-router-dom";

interface NavBarProps {
  children: ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(queryClient),
  });
  return user ? (
    <div className="w-screen min-h-screen text-white-text font-oswald">
      {/* Navbar fixa */}
      <div className="fixed top-0 w-screen h-[8vh] bg-black-filter font-oswald text-[1.6rem] flex flex-col group z-50 ">
        <div className="grid items-center grid-cols-4 h-full">
          <Link to={"/home"} className="text-[2.8rem] ml-20 cursor-default">
            <span className="w-fit hover:text-[3.0rem] hover:scale-105 duration-300 cursor-pointer">
              C.R.I.S.
            </span>
          </Link>
          <Link to={"/personagens"} className="text-center cursor-default">
            <span className="w-fit hover:text-[1.75rem] hover:scale-105 duration-300 cursor-pointer">
              PERSONAGENS
            </span>
          </Link>
          <Link to={"/campanhas"} className="text-center cursor-default ">
            <span className="w-fit hover:text-[1.75rem] hover:scale-105 duration-300 cursor-pointer">
              CAMPANHAS
            </span>
          </Link>
          <div className="flex gap-x-2 justify-center group items-center">
            <button className="hover:text-white hover:scale-105 duration-300">
              {user.username}
            </button>
            {/* Círculo do ícone do perfil */}
            <div className="hover:scale-105 duration-300 rounded-full h-16 w-16 flex items-center justify-center border-2 border-border-red bg-login-gray"></div>
          </div>
        </div>
        <div className="h-[3px] bg-border-red group-hover:bg-border-red-hover drop-shadow-2xl"></div>
      </div>
      {/* Espaçamento para o conteúdo não ficar escondido pela navbar fixa */}
      <div className="pt-[8vh]">
        <div className="h-[92vh]">{children}</div>
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen bg-red-950"></div>
  );
};

export default NavBar;
