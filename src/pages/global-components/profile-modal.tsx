import { Link } from "react-router-dom";
import { User } from "../../types/user.entity";
import Modal from "react-modal";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";

interface ProfileModalProps {
  isOpen: boolean;
  user: User;
  onRequestClose: () => void;
}

export const ProfileModal = ({
  user,
  isOpen,
  onRequestClose,
}: ProfileModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="mt-20 z-50 right-0 fixed bg-card-gray mr-10 border-2 border-border-red rounded-lg  flex flex-col " // Conteúdo do modal com fundo transparente
      style={{
        overlay: {
          backgroundColor: "rgba(255, 255, 255, 0)", // Overlay transparente
        },
        content: {
          WebkitOverflowScrolling: "touch",
        },
      }}
    >
      <div className="text-white-text text-2xl font-oswald w-fit flex flex-col p-5 gap-y-2  ">
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <div className="w-full h-[1px] bg-border-red"></div>

        <Link to="/profile" className="flex gap-x-2">
          <div className="justify-center items-center hover:scale-110 duration-300 flex gap-x-2">
            <LuUser2 className="mt-1 font-extrabold text-3xl" />
            <span>Perfil</span>
          </div>
        </Link>
        <Link
          to="/login"
          className="flex gap-x-2"
          onClick={() => {
            localStorage.removeItem("jwt");
          }}
        >
          <div className="justify-center items-center hover:scale-110 duration-300 flex gap-x-3">
            <RiLogoutBoxLine className="mt-1 " />
            <span>Sair</span>
          </div>
        </Link>
        {/* Outros componentes do modal */}
      </div>
    </Modal>
  );
};
