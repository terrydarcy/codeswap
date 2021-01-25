import React, { Component, createContext, useEffect, useState } from "react";
import { auth, generateUserDocument } from "../config/fire";

export const UserContext = createContext({ user: null });

function UserProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("User");
    if (data) {
      if (data != undefined) {
        console.log("test", JSON.parse(data));
        setUser(JSON.parse(data));
      }
    }
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      if (user != undefined) localStorage.setItem("User", JSON.stringify(user));
      setUser(user);
    });
  }, []);

  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
}
export default UserProvider;
