import React, { useContext, useState, useEffect } from "react";
import "./styles/Home.css";
import { UserContext } from "../providers/UserProvider";
import TaskCard from "../components/TaskCard";
import firebase from "firebase";

function Home() {
  const user = useContext(UserContext);
  const [email_, setEmail] = useState("");
  const [displayName_, setDisplayName] = useState("");
  const [photoURL_, setPhotoURL] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setEmail(email);
      setDisplayName(displayName);
      setPhotoURL(photoURL);
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("tasks")
      .orderBy("timestampPosted", "desc")
      .onSnapshot((snapshot) => {
        setTasks(snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data() })));
      });
  }, []);

  return (
    <div className="Home">
      <h1 style={{ marginBottom: 0 }}>Task Feed</h1>
      <div className="task_container">
        {tasks.map(({ task, id }) => (
          <TaskCard key={id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Home;
