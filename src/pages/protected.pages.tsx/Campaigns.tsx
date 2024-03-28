import LogOff from "./components/LogOff";
import { RedirectHome } from "./components/RedirectHome";

export const Campaings = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex">
        <RedirectHome />
        <LogOff />
      </div>
    </div>
  );
};

export default Campaings;
