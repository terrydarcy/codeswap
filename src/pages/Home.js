import React, { useContext, useState, useEffect } from "react";
import "./styles/Home.css";
import { Button } from "@material-ui/core";
import { UserContext } from "../providers/UserProvider";
import TaskCard from "../components/TaskCard";
import firebase from "firebase";
import { useHistory } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import pacmanLoading from "../res/pacman.svg";

function Home() {
  const user = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  let history = useHistory();

  const [lastEntry, setLastEntry] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      const { email, displayName, photoURL } = user;
    }
    return setLoaded(true);
  }, [user]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("tasks")
      .orderBy("timestampPosted", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        setTasks(snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data() })));
        setLastEntry(snapshot.docs[snapshot.docs.length - 1]);
      });
  }, []);

  const fetchMoreData = async () => {
    await setTimeout(() => {
      firebase
        .firestore()
        .collection("tasks")
        .orderBy("timestampPosted", "desc")
        .startAfter(lastEntry)
        .limit(5)
        .onSnapshot((snapshot) => {
          setTasks(tasks.concat(snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data() }))));
          setLastEntry(snapshot.docs[snapshot.docs.length - 1]);

          if (snapshot.docs.length <= 0) {
            setHasMore(false);
          }
        });
    }, 650);
  };
  return (
    <div className="Home">
      {user && loaded ? (
        <div></div>
      ) : (
        <div className="logged_out_landing">
          <h1 style={{ margin: 10, padding: 10 }} className="header_logo">
            Welcome to code<span className="header_text_color_mod">swap</span>
          </h1>

          <h4 style={{ margin: 15 }}>
            Connecting new developer questions with experienced developers answers
            <br />
            <br />A platform to empower and financially support developers with the honor tipping system
            <br />
            <br />
            There is no honor among thieves!
          </h4>

          <div className="logged_out_landing_buttons">
            <Button className="login_buttons" variant="contained" size="large" style={{ backgroundColor: "#42C062", color: "#e6e6e6", padding: 5 }} onClick={() => history.push("/login")}>
              Log In
            </Button>
            <h4 style={{ margin: 10 }}>or</h4>
            <Button variant="contained" size="small" style={{ textAlign: "center", padding: 5, backgroundColor: "#0079BF", color: "#e6e6e6" }} onClick={() => history.push("/Createaccount")}>
              Create Account
            </Button>
          </div>
        </div>
      )}
      <h1 style={{ marginBottom: 0 }}>The Stack</h1>
      <br />
      <div className="task_container">
        <InfiniteScroll
          dataLength={tasks.length}
          next={fetchMoreData}
          width="100%"
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You've reached the end of the stack!</b>
            </p>
          }
          loader={<img src={pacmanLoading} alt="loading" width="100" />}
        >
          {tasks.map(({ task, id }) => (
            <TaskCard key={id} task={task} id={id} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
