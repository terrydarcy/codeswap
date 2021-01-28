import React, { forwardRef, useEffect, useState } from "react";
import "./styles/VotingUI.css";
import upVoteImg from "../res/upVoteImg.png";
import downVoteImg from "../res/downVoteImg.png";
import firebase from "firebase";

import downVotedDisabled from "../res/downVotedDisabled.png";
import upVotedDisabled from "../res/upVotedDisabled.png";
import { setUpVoted } from "../redux/actions";

const Voting = forwardRef(({ id, userID }, ref) => {
  const [upVotedCheck, setUpVotedCheck] = useState(false);
  const [downVotedCheck, setDownVotedCheck] = useState(false);

  useEffect(() => {
    let unmounted = false;

    isUpVoted(id, userID).then(function (result) {
      if (!unmounted) {
        if (result) {
          setUpVotedCheck(true);
        } else {
          setUpVotedCheck(false);
        }
      }
    });

    isDownVoted(id, userID).then(function (result) {
      if (!unmounted) {
        if (result) {
          setDownVotedCheck(true);
        } else {
          setDownVotedCheck(false);
        }
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

  const isUpVoted = async (taskID, userID) => {
    var upVoted = false;
    await firebase
      .firestore()
      .collection("tasks")
      .doc(taskID)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          if (doc.data().upVoted != undefined) if (doc.data().upVoted.includes(userID)) upVoted = true;
        }
      })
      .catch(function (error) {
        console.log("Error getting task document (upvote):", error);
      });

    return upVoted;
  };

  const upVote = (taskID, userID) => {
    isUpVoted(taskID, userID).then(function (result) {
      if (!result) {
        firebase
          .firestore()
          .collection("tasks")
          .doc(taskID)
          .update({
            upVoted: firebase.firestore.FieldValue.arrayUnion(userID),
            downVoted: firebase.firestore.FieldValue.arrayRemove(userID),
          });
        setUpVotedCheck(true);
        setDownVotedCheck(false);
      } else {
        firebase
          .firestore()
          .collection("tasks")
          .doc(taskID)
          .update({
            upVoted: firebase.firestore.FieldValue.arrayRemove(userID),
          });
        setUpVotedCheck(false);
      }
    });
  };

  const isDownVoted = async (taskID, userID) => {
    var downVoted = false;
    await firebase
      .firestore()
      .collection("tasks")
      .doc(taskID)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          if (doc.data().downVoted != undefined) if (doc.data().downVoted.includes(userID)) downVoted = true;
        }
      })
      .catch(function (error) {
        console.log("Error getting task document (downvote):", error);
      });

    return downVoted;
  };

  const downVote = (taskID, userID) => {
    isDownVoted(taskID, userID).then(function (result) {
      if (!result) {
        firebase
          .firestore()
          .collection("tasks")
          .doc(taskID)
          .update({
            downVoted: firebase.firestore.FieldValue.arrayUnion(userID),
            upVoted: firebase.firestore.FieldValue.arrayRemove(userID),
          });
        setDownVotedCheck(true);
        setUpVotedCheck(false);
      } else {
        firebase
          .firestore()
          .collection("tasks")
          .doc(taskID)
          .update({
            downVoted: firebase.firestore.FieldValue.arrayRemove(userID),
          });
        setDownVotedCheck(false);
      }
    });

    return () => {};
  };

  return (
    <div ref={ref}>
      {upVotedCheck ? <img className="upVote" src={upVoteImg} alt="up vote" onClick={() => upVote(id, userID)} /> : <img className="upVote" src={upVotedDisabled} alt="up vote" onClick={() => upVote(id, userID)} />}

      {downVotedCheck ? <img className="upVote" style={{ marginLeft: 10 }} src={downVoteImg} alt="down vote" onClick={() => downVote(id, userID)} /> : <img className="downVote" src={downVotedDisabled} style={{ marginLeft: 10 }} alt="down vote" onClick={() => downVote(id, userID)} />}
    </div>
  );
});

export default Voting;
