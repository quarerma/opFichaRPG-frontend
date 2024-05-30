import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";

import { useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../../../env";
import { Campaign } from "../../../../types/campaign.entity";

export const JoinCampaign = () => {
  const queryClient = useQueryClient();
  const [campaignId, setCampaignId] = useState<string>("");

  async function handleJoinCampaign() {
    try {
      const response = await axios.patch(
        `${BASE_URL}users/joinCampaign/${campaignId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      const cachedData: Campaign[] | undefined = queryClient.getQueryData([
        "userCampaigns",
      ]);

      if (cachedData) {
        queryClient.setQueryData(
          ["userCampaigns"],
          [...cachedData, response.data]
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="bg-login-gray rounded-3xl text-center overflow-hidden flex flex-col p-5 space-y-5 text-3xl">
        <h1 className="underline text-center w-full">Entrar em uma mesa</h1>
        <span className="text-2xl">Clique aqui para entrar em uma mesa</span>
      </Dialog.Trigger>
      <Dialog.Content className="absolute inset-0 flex justify-center items-center bg-black/50">
        <div className="text-center bg-login-gray p-4 rounded-2xl flex flex-col space-y-4 items-center relative">
          <Dialog.Close className="absolute top-2 right-2 z-50 hover:scale-125">
            <IoMdCloseCircleOutline className="text-3xl" />
          </Dialog.Close>
          <h1 className="underline text-3xl px-5">INSIRA O ID DA MESA</h1>
          <input
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            type="text"
            className="text-black p-2 rounded-xl h-[36px] bg-input-gray text-lg w-full focus:outline-none focus:ring focus:ring-black"
          />
          <button
            onClick={handleJoinCampaign}
            className={`p-2 rounded-2xl w-fit ${
              !campaignId
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-900 hover:bg-teal-800"
            }`}
            disabled={!campaignId}
          >
            Participar
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default JoinCampaign;
