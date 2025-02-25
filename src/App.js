import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Forum from "./Pages/Forum/Forum";
import Login from "./Pages/Login/Login";

export const AppContext = createContext(null);

function App() {
  const [replyKeeper, setReplyKeeper] = useState("");
  const [replyIdKeeper, setReplyIdKeeper] = useState(0);
  const [senderKeeper, setSenderKeeper] = useState("");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
});;

  return (
    <AppContext.Provider value={{ replyKeeper, setReplyKeeper, replyIdKeeper, setReplyIdKeeper, senderKeeper, setSenderKeeper, theme, setTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Forum" element={<Forum />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
