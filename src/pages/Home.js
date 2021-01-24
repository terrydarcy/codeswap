import React, { useContext, useState, useEffect } from "react";
import "./styles/Home.css";
import { UserContext } from "../providers/UserProvider";

function Home() {
  const user = useContext(UserContext);
  const [email_, setEmail] = useState("");
  const [displayName_, setDisplayName] = useState("");
  const [photoURL_, setPhotoURL] = useState("");

  useEffect(() => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setEmail(email);
      setDisplayName(displayName);
      setPhotoURL(photoURL);
      console.log(user);
    }
  }, [user]);

  return (
    <div className="Home">
      <div className="jobCard">
        <h2>Scheme Algorithm</h2>
      </div>
      <div className="jobCard">
        <h2>Prolog Algorithm</h2>
      </div>
    </div>
  );
}

export default Home;
