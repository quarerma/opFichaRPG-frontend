import { useEffect } from "react";
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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

      <div className="flex-col text-gray-800 text-[0.9rem] font-oswald mb-2">
        {skill?.only_trained && <p>Apenas treinados </p>}
        {skill?.carry_peanalty && <p>Penalidade de carga </p>}
        {skill?.needs_kit && <p>Necessita de kit </p>}
      </div>
      <p>
        {skill?.description.split("\n").map((line, index) => {
          const lineWithBold = line.replace(/{(.*?)}/g, "<strong>$1</strong>");
          return (
            <span
              key={index}
              className="text-[1.3rem] block mb-5 leading-7"
              dangerouslySetInnerHTML={{ __html: lineWithBold }}
            />
          );
        })}
      </p>
    </Modal>
  );
};
