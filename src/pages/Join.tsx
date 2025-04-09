import React, { useState, FormEvent, useContext } from "react";
import { useParams } from "react-router";
import { UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { baseAPIUrl } from "../shared/constants";
import { AuthContext } from "../contexts/AuthContext";
import { AlertProps } from "../components/Alert";

const Join: React.FC = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageType, setErrorMessageType] =
    useState<AlertProps["type"]>("error");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useContext(AuthContext);

  const { mode } = useParams();
  const resumeChat = mode === "resume";

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      setErrorMessage("");
      const url = `${baseAPIUrl}/chat${resumeChat ? "/resume" : "/join"}`;
      const config = {
        headers: {},
      };

      const response = await axios.post(url, { username }, config);
      const { data, message } = response.data;

      setErrorMessage(message);
      setErrorMessageType("success");

      // persist user in context, local storage
      await localStorage.setItem("ct_chat_user", JSON.stringify(data));
      await setTimeout(() => {
        auth?.setUser(data);
        setIsSubmitting(false);
      }, 3000);
    } catch (error: any) {
      setErrorMessageType("error");
      setErrorMessage(error.response.data);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="h-screen bg-slate-50 text-slate-700">
      <Header />

      <div className="px-10 py-20 md:py-30 max-w-lg mx-auto">
        {errorMessage && (
          <Alert message={errorMessage} type={errorMessageType} />
        )}

        <form
          className="space-y-10 md:space-y-13 pt-15 md:pt-17"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center font-semibold text-xl md:text-2xl">{`${
            resumeChat ? "Resume" : "Join"
          } Chat`}</h2>

          <TextInput
            name="username"
            label="Username"
            placeholder="e.g. chris414"
            value={username.toLowerCase()}
            onChange={(e) => setUsername(e.target.value)}
            icon={<UserIcon />}
          />

          <Button disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner variant="small" />
            ) : (
              `${resumeChat ? "Resume" : "Join"}`
            )}
          </Button>
        </form>

        {!resumeChat && (
          <p className="mt-10 md:mt-12 md:text-lg text-center">
            Joined already?{" "}
            <a
              href="/join/resume"
              className="text-sky-500 hover:text-sky-600 font-semibold"
            >
              Resume Chat
            </a>
          </p>
        )}

        {resumeChat && (
          <p className="mt-10 md:mt-12 md:text-lg text-center">
            New here?{" "}
            <a
              href="/join"
              className="text-sky-500 hover:text-sky-600 font-semibold"
            >
              Join Chat
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Join;
