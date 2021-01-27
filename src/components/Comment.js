import React, { forwardRef, useEffect, useState } from "react";
import "./styles/Comment.css";
import { capitalizeFirstLetter } from "./Capitalizer";
import { Button, IconButton } from "@material-ui/core";
import { getTimeDiff } from "./TimeMaths";
import firebase from "firebase";

const Comment = forwardRef(({ comment, id }, ref) => {
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    var docRef = firebase.firestore().collection("Users").doc(comment.postedBy);
    setTimeDiff(getTimeDiff(comment.timestampPosted));
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setPhotoURL(doc.data().photoURL);
          setDisplayName(doc.data().displayName);
        } else {
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  });

  return (
    <div className="comment_container">
      <div className="comment">
        <div className="rounded_profile_task_container">
          <IconButton aria-controls="fade-menu-liked" aria-haspopup="true">
            <img className="rounded_profile_comment" src={photoURL} />
          </IconButton>
          <h4 style={{ margin: 0 }}>{capitalizeFirstLetter(displayName)} &#xb7; </h4>
          <p style={{ margin: 0, marginLeft: 5, fontSize: 15 }}>{timeDiff}</p>
        </div>
        <p style={{ paddingLeft: 10 }}>{comment.comment}</p>
      </div>
    </div>
  );
});

export default Comment;
