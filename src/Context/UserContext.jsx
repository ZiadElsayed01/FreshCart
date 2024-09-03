import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [user, setUser] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
