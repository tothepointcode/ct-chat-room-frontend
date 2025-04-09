import { FC, useContext } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";

interface HeaderProps {
  isChats?: boolean;
}

const Header: FC<HeaderProps> = ({ isChats }) => {
  const auth = useContext(AuthContext);

  const exitChat = async () => {
    await localStorage.removeItem("ct_chat_user");
    auth?.setUser(null);
  };

  return (
    <div className="py-4 md:py-5 bg-slate-50 border-b-2 border-slate-100 fixed right-0 left-0 top-0">
      <h1 className="text-xl md:text-2xl font-semibold text-center text-sky-500">
        CT Chat Room
      </h1>

      {isChats && (
        <div className="absolute top-2 right-5 md:top-3 md:right-40">
          <button
            onClick={exitChat}
            className="w-auto px-3 h-12 text-slate-500 hover:text-slate-600 flex justify-center items-center font-semibold"
          >
            <ArrowRightStartOnRectangleIcon className="size-6 md:size-7" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
