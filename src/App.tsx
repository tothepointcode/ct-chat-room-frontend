import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [user, setUser] = useState({ username: "" });

  const fetchStoredUser = async () => {
    try {
      const storedUser = await localStorage.getItem("ct_chat_user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStoredUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppRoutes />
    </AuthContext.Provider>
  );
}

export default App;
