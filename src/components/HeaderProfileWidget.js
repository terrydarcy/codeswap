import React, { useState, useEffect } from "react";
import "./styles/HeaderProfileWidget.css";

const HeaderProfileWidget = ({ user }) => {
  const [photoURL_, setPhotoURL] = useState("");

  useEffect(() => {
    const { photoURL } = user;
    if (user) {
      setPhotoURL(photoURL);
    }
  }, [user]);

  return (
    <div>
      <img className="rounded_profile" src={photoURL_} alt="profile" />
    </div>
  );
};

export default HeaderProfileWidget;
