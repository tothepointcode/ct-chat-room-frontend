import { FC, useEffect, useContext, useState, FormEvent } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import Header from "../components/Header";
import Message from "../components/Message";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { baseAPIUrl } from "../shared/constants";
import { AlertProps } from "../components/Alert";

const Chats: FC = () => {
  const auth = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageType, _] = useState<AlertProps["type"]>("error");
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  const fetchMessages = async () => {
    try {
      setErrorMessage("");
      const url = `${baseAPIUrl}/message/fetch`;
      const config = {
        headers: {
          username: auth?.user.username,
        },
      };

      const response = await axios.get(url, config);
      const { data } = response.data;
      setMessages(data.messages);

      setIsFetching(false);
    } catch (error: any) {
      setErrorMessage(error.response.data);
      setIsFetching(false);
    }
  };

  const sendMessage = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setErrorMessage("");
      const url = `${baseAPIUrl}/message/send`;
      const config = {
        headers: {
          username: auth?.user.username,
        },
      };

      await axios.post(url, { content: messageContent }, config);
      setMessageContent("");
      setIsSubmitting(false);
    } catch (error: any) {
      setErrorMessage(error?.response.data);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setInterval(() => fetchMessages(), 5000);
  }, []);

  return (
    <div className="h-screen bg-slate-50 rounded-lg text-slate-700  ">
      <Header isChats={true} />

      <div className="px-10 overflow-auto h-full pt-15 md:pt-20 pb-20 md:pb-30 max-w-3xl mx-auto">
        {errorMessage && (
          <Alert message={errorMessage} type={errorMessageType} />
        )}

        {isFetching && (
          <div className="flex self-center h-full justify-center items-center">
            <Spinner />
          </div>
        )}

        {!isFetching && (
          <>
            {messages.map(({ content, username, sent_at }, index) => {
              return (
                <Message
                  key={index}
                  content={content}
                  username={username}
                  timestamp={sent_at}
                  right={username === auth?.user.username}
                />
              );
            })}
          </>
        )}
      </div>

      <form
        className="fixed max-w-3xl mx-auto flex px-10 py-3 gap-3 md:gap-5  bottom-0 bg-slate-50 justify-center px-auto left-0 right-0"
        onSubmit={sendMessage}
      >
        <TextInput
          icon={<ChatBubbleBottomCenterTextIcon />}
          placeholder="Message"
          variant="chat"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <Button variant="small" disabled={!messageContent}>
          {isSubmitting ? (
            <Spinner variant="small" />
          ) : (
            <PaperAirplaneIcon className="size-6 md:size-7 text-slate-50" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default Chats;
