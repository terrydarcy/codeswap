import React, { forwardRef, useContext, useEffect, useState } from "react";
import "./styles/Reply.css";
import { getTimeDiff } from "./TimeMaths";
import firebase from "firebase";
import { UserContext } from "../providers/UserProvider";
import { capitalizeFirstLetter } from "./Capitalizer";

const Reply = forwardRef(({ reply, id }, ref) => {
  const [displayName, setDisplayName] = useState("");
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    var docRef = firebase.firestore().collection("Users").doc(reply.postedBy);
    setTimeDiff(getTimeDiff(reply.timestampPosted));
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setDisplayName(doc.data().displayName);
        } else {
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [reply.timestampPosted, reply.postedBy]);

  return (
    <div ref={ref} className="reply_container">
      <div className="reply">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h4 style={{ margin: 0, color: "#42c062", fontSize: 14 }}>{capitalizeFirstLetter(displayName)} &#xb7;</h4>
          <p style={{ margin: 0, marginLeft: 5, fontSize: 12, color: "#42c062" }}>{timeDiff}</p>
        </div>

        <p style={{ margin: 0, fontSize: 14 }}>{capitalizeFirstLetter(reply.reply)}</p>
      </div>
    </div>
  );
});

export default Reply;
