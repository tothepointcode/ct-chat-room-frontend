import { FC } from "react";

export interface MessageProps {
  username: string;
  content: string;
  timestamp: Date;
  right?: boolean;
}

const Message: FC<MessageProps> = ({ username, content, timestamp, right }) => {
  const formatDate = (date: any) => {
    let formattedDate = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: undefined,
      hour12: false,
    }).format(new Date(date));

    return formattedDate;
  };

  return (
    <div className={`flex mt-5 md:mt-7 ${right && "justify-end"}`}>
      {!right && (
        <div className="bg-sky-500 h-7 w-7 p-4 md:h-9 md:w-9 md:p-5 rounded-full flex justify-center items-center font-bold mr-2 md:mr-4">
          <p className="text-slate-50">{username[0].toUpperCase()}</p>
        </div>
      )}

      <div
        className={`${
          right ? "bg-sky-100 rounded-br-none" : "bg-slate-100 rounded-tl-none"
        } px-4 pt-1 pb-2 md:px-6 md:pt-2 md:pb-3 rounded-xl space-y-1 md:space-y-2 text-slate-900`}
      >
        <h3 className="font-semibold text-sky-500 md:text-lg">{username}</h3>
        <p className="break-all md:text-lg">{content}</p>
        <p className="text-sm md:text-base text-right text-slate-500 ">
          {formatDate(timestamp)}
        </p>
      </div>
    </div>
  );
};

export default Message;
