import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

export const RedirectHome = () => {
  return (
    <Link to="/home" className=" text-3xl px-2 mt-2 h-full">
      <MdHome />
    </Link>
  );
};
