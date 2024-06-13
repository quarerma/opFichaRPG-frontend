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
      <div className="w-screen h-[10vh] bg-black-filter  font-oswald text-3xl flex flex-col group">
        <div className="grid items-center grid-cols-4  h-full">
          <Link to={"/home"} className="text-5xl ml-20 ">
            <span className="w-fit hover:text-[3.1rem] hover:scale-105 duration-300">
              C.R.I.S.
            </span>
          </Link>
          <Link to={"/personagens"} className=" text-center">
            <span className="w-fit hover:text-[2.1rem] hover:scale-105 duration-300">
              PERSONAGENS
            </span>
          </Link>
          <Link to={"/campanhas"} className=" text-center">
            <span className="w-fit hover:text-[2.1rem] hover:scale-105 duration-300">
              CAMPANHAS
            </span>
          </Link>
          <div className="flex gap-x-2 justify-center items-center group dura">
            <button className=" group-hover:text-white group-hover:scale-105 duration-300">
              {user.username}
            </button>
            {/* Círculo do ícone do perfil */}
            <div className="group-hover:scale-105 duration-300 rounded-full  h-16 w-16 flex items-center justify-center border-2 border-border-red bg-login-gray"></div>
          </div>
        </div>
        <div className="h-[6px] bg-border-red group-hover:bg-border-red-hover drop-shadow-2xl "></div>
      </div>
      <div className="h-[90vh]">{children}</div>
    </div>
  ) : (
    <div className="w-screen h-screen bg-red-950"></div>
  );
};
