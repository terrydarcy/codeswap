import React, { forwardRef, useEffect, useState } from "react";
import "./styles/Voting.css";
import upVoteImg from "../res/upVoteImg.png";
import downVoteImg from "../res/downVoteImg.png";
import firebase from "firebase";
import { useHistory } from "react-router";
import downVotedDisabled from "../res/downVotedDisabled.png";
import upVotedDisabled from "../res/upVotedDisabled.png";

const Voting = forwardRef(({ id, userID }, ref) => {
  const [upVotedCheck, setUpVotedCheck] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [downVotedCheck, setDownVotedCheck] = useState(false);
  let history = useHistory();

  useEffect(() => {
    let unmounted = false;
    if (userID) {
      isUpVoted(id, userID).then(function (result) {
        if (result) {
          if (!unmounted) {
            setUpVotedCheck(true);
          }
        } else {
          if (!unmounted) {
            setUpVotedCheck(false);
          }
        }
      });

      isDownVoted(id, userID).then(function (result) {
        if (result) {
          if (!unmounted) {
            setDownVotedCheck(true);
          }
        } else {
          if (!unmounted) {
            setDownVotedCheck(false);
          }
        }
      });
    }

    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .onSnapshot((snapshot) => {
        var upVoteLength = snapshot.data().upVoted.length;
        var downVoteLength = snapshot.data().downVoted.length;
        if (!unmounted) {
          setVoteCount(upVoteLength - downVoteLength);
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
    if (userID) {
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
        firebase
          .firestore()
          .collection("tasks")
          .doc(taskID)
          .get()
          .then(function (doc) {
            var upVoteLength = doc.data().upVoted.length;
            var downVoteLength = doc.data().downVoted.length;
            setVoteCount(upVoteLength - downVoteLength);
          });
      });
    } else {
      history.push("/login");
    }
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
    if (userID) {
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
          setVoteCount(voteCount - 1);
        } else {
          firebase
            .firestore()
            .collection("tasks")
            .doc(taskID)
            .update({
              downVoted: firebase.firestore.FieldValue.arrayRemove(userID),
            });
          setDownVotedCheck(false);
          setVoteCount(voteCount + 1);
        }
        firebase
          .firestore()
          .collection("tasks")
          .doc(taskID)
          .get()
          .then(function (doc) {
            var upVoteLength = doc.data().upVoted.length;
            var downVoteLength = doc.data().downVoted.length;
            setVoteCount(upVoteLength - downVoteLength);
          });
      });
    } else {
      history.push("/login");
    }
  };

  return (
    <div ref={ref} className="voting_container">
      {upVotedCheck ? <img className="upVote" src={upVoteImg} alt="up vote" onClick={() => upVote(id, userID)} width="30" height="30" /> : <img className="upVote" src={upVotedDisabled} alt="up vote" onClick={() => upVote(id, userID)} width="30" height="30" />}

      <h4 style={{ width: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#d9215a" }}>{voteCount < 0 && voteCount}</span>
        <span style={{ color: "#42c062" }}>{voteCount >= 0 && voteCount}</span>
      </h4>

      {downVotedCheck ? <img className="upVote" src={downVoteImg} alt="down vote" width="30" height="30" onClick={() => downVote(id, userID)} /> : <img className="downVote" src={downVotedDisabled} alt="down vote" onClick={() => downVote(id, userID)} width="30" height="30" />}
    </div>
  );
});

export default Voting;
