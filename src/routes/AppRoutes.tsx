import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Join from "../pages/Join";
import Chats from "../pages/Chats";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const AppRoutes = () => {
  const auth = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {auth?.user?.username ? (
          <>
            <Route path="/" element={<Chats />} />
          </>
        ) : (
          <>
            <Route path="/join/:mode" element={<Join />} />
            <Route path="/join" element={<Join />} />
          </>
        )}
        <Route
          path="*"
          element={
            <Navigate to={auth?.user?.username ? "/" : "/join"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
