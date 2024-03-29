import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const LogOff = () => {
  return (
    <Link
      to="/login"
      className=" px-2 max-md:top-5 text-3xl flex gap-x-2 right-0 top-0 "
      onClick={() => {
        localStorage.removeItem("jwt");
      }}
    >
      <div className="group flex">
        <RiLogoutBoxLine className="mt-1 " />
        <span className="mt-1  text-[1.3rem] -translate-y-52 w-0  group-hover:translate-y-0 duration-500  pointer-events-none ">
          Sair
        </span>
      </div>
    </Link>
  );
};

export default LogOff;
