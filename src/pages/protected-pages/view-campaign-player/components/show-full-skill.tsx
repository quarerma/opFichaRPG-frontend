import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "react-modal";
import { getSkillData } from "../services/skill-service";

interface ShowSkillProps {
  name: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const ShowSkillDetailed = ({
  name,
  isOpen,
  onRequestClose,
}: ShowSkillProps) => {
  const queryClient = useQueryClient();
  const { data: skill } = useQuery({
    queryKey: ["skill", name],
    queryFn: () => getSkillData(queryClient, name),
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="z-20 absolute top-0 left-0 bottom-0 w-1/3 overflow-auto bg-gray-300 p-8 rounded-lg outline-none"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          WebkitOverflowScrolling: "touch",
        },
      }}
    >
      <h1 className="text-3xl underline font-oswald">{skill?.name}</h1>
      <div className="py-4 text-[1.4rem]">
        <p>
          {skill?.description.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <br />
      </div>
    </Modal>
  );
};
