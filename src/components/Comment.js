import React, { forwardRef, useEffect, useState } from "react";
import "./styles/Comment.css";
import { capitalizeFirstLetter } from "./Capitalizer";
import { IconButton } from "@material-ui/core";
import { getTimeDiff } from "./TimeMaths";
import firebase from "firebase";
import loadingImage from "../res/profile_comment_loading.png";

const Comment = forwardRef(({ comment }, ref) => {
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [timeDiff, setTimeDiff] = useState("");
  const [loaded, setLoaded] = useState("");

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
  }, [comment.timestampPosted, comment.postedBy]);
  const commentLoadingStyle = !loaded ? { display: "none" } : {};

  return (
    <div ref={ref} className="comment_container">
      <div className="comment">
        {!loaded && (
          <div className="rounded_profile_task_container">
            <img src={loadingImage} alt="loading" />
          </div>
        )}
        <div className="rounded_profile_task_container" style={commentLoadingStyle}>
          <IconButton aria-controls="fade-menu-liked" aria-haspopup="true">
            <img className="rounded_profile_comment" src={photoURL} onLoad={() => setLoaded(true)} alt="profile" />
          </IconButton>
          <h4 style={{ margin: 0, color: "#42c062" }}>{capitalizeFirstLetter(displayName)} &#xb7; </h4>
          <p style={{ margin: 0, marginLeft: 5, fontSize: 15, color: "#42c062" }}>{timeDiff}</p>
        </div>
        <p style={{ paddingLeft: 10, paddingRight: 10 }}>{comment.comment}</p>
      </div>
    </div>
  );
});

export default Comment;
