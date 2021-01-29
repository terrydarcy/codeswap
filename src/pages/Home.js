import React, { useContext, useState, useEffect } from "react";
import "./styles/Home.css";
import { Button, makeStyles } from "@material-ui/core";
import { UserContext } from "../providers/UserProvider";
import TaskCard from "../components/TaskCard";
import firebase from "firebase";
import { useHistory } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import pacmanLoading from "../res/pacman.svg";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

function Home() {
  const user = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [lastEntry, setLastEntry] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [sorting, setSorting] = useState("");
  const [ascDesc, setAscDesc] = useState("desc");
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    var unmounted = false;
    if (!unmounted) {
      sortNew();
    }
    return () => (unmounted = true);
  }, []);

  const sortNew = async () => {
    if (sorting !== "timestampPosted") {
      setHasMore(true);
      setSorting("timestampPosted");
      setAscDesc("desc");
      await firebase
        .firestore()
        .collection("tasks")
        .orderBy("timestampPosted", "desc")
        .limit(5)
        .get()
        .then((snapshot) => {
          setTasks(snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data() })));
          setLastEntry(snapshot.docs[snapshot.docs.length - 1]);
        });
    }
  };

  const sortTop = async () => {
    if (sorting !== "voteCount") {
      setHasMore(true);
      setSorting("voteCount");
      setAscDesc("desc");
      await firebase
        .firestore()
        .collection("tasks")
        .orderBy("voteCount", "desc")
        .limit(5)
        .get()
        .then((snapshot) => {
          console.log();
          setTasks(snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data() })));
          setLastEntry(snapshot.docs[snapshot.docs.length - 1]);
        });
    }
  };

  const fetchMoreData = () => {
    firebase
      .firestore()
      .collection("tasks")
      .orderBy(sorting, ascDesc)
      .startAfter(lastEntry)
      .limit(5)
      .get()
      .then((snapshot) => {
        setTasks(tasks.concat(snapshot.docs.map((doc) => ({ id: doc.id, task: doc.data() }))));
        setLastEntry(snapshot.docs[snapshot.docs.length - 1]);
        if (snapshot.docs.length <= 0) {
          setHasMore(false);
        }
      });
  };

  return (
    <div className="Home" id="home">
      {user ? (
        <div></div>
      ) : (
        <div className="logged_out_landing">
          <h1 style={{ margin: 10, padding: 10 }} className="header_logo">
            Welcome to code<span className="header_text_color_mod">swap</span>
          </h1>
          <h4 style={{ margin: 15 }}>
            Connecting new developer questions with experienced developers answers
            <br />
            <br />
            A platform to empower and financially support developers with the honor tipping system
            <br /> <br />
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

      {sorting == "timestampPosted" && (
        <div className="sorting_container">
          <button className="sortButtonActivated" onClick={() => sortNew()} style={{ marginRight: 15 }}>
            <NewReleasesIcon style={{ marginRight: 10, fontSize: 20 }} />
            New
          </button>
          <button className="sortButton" onClick={() => sortTop()}>
            <TrendingUpIcon style={{ marginRight: 10, fontSize: 20 }} />
            Top
          </button>
        </div>
      )}
      {sorting == "voteCount" && (
        <div className="sorting_container">
          <button className="sortButton" onClick={() => sortNew()} style={{ marginRight: 15 }}>
            <NewReleasesIcon style={{ marginRight: 10, fontSize: 20 }} />
            New
          </button>
          <button className="sortButtonActivated" onClick={() => sortTop()}>
            <TrendingUpIcon style={{ marginRight: 10, fontSize: 20 }} />
            Top
          </button>
        </div>
      )}

      <br />
      <InfiniteScroll
        dataLength={tasks.length}
        next={fetchMoreData}
        style={{ overflow: "show" }}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You've reached the end of the stack!</b>
          </p>
        }
        loader={<img src={pacmanLoading} alt="loading" width="100" />}
      >
        {tasks.map(({ task, id }) => (
          <TaskCard key={id} task={task} id={id} user={user} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  sortButtonEnabled: {
    fontFamily: "Consolas",
    minWidth: 80,
    fontSize: 12,
    borderRadius: 10,
    backgroundColor: "#42c062",
    color: "#e6e6e6",
    padding: 2,
    margin: 10,
    height: 35,
  },
  sortButton: {
    fontFamily: "Consolas",
    minWidth: 80,
    fontSize: 12,
    borderRadius: 10,
    backgroundColor: "#1c222b",
    color: "#e6e6e6",
    padding: 2,
    margin: 10,
    height: 35,
  },
}));
export default Home;
