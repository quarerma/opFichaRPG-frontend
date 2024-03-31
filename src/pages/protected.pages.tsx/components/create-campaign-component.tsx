import { Link } from "react-router-dom";

export function CreateCampaignComponent() {
  return (
    <Link
      to={"/create-campaign"}
      className="bg-login-gray hover:underline rounded-3xl text-center overflow-hidden flex flex-col p-5 space-y-5 text-3xl"
    >
      <span>Criar Campanha</span>
    </Link>
  );
}
