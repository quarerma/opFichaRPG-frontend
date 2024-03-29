import LogOff from "./LogOff";
import { RedirectHome } from "./RedirectHome";

export const HomeLogOff = () => {
  return (
    <div className="flex w-full fixed justify-center  ">
      <div className="flex justify-center items-center bg-black rounded-3xl p-1 mt-2">
        <RedirectHome />
        <LogOff />
      </div>
    </div>
  );
};

export default HomeLogOff;
