import React, { useEffect } from "react";
import "./styles/SplashScreen.css";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import money from "../res/money.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function SpashScreen() {
  useEffect(() => {}, []);

  const dispatch = useDispatch();
  const Logintoggled = useSelector((state) => state.toggleLogin);

  return (
    <div className="splash_screen">
      <div className="splash_card_top"></div>
      <div className="splash_card_bottom">
        <div className="splash_card">
          <div className="splash_title">
            <img width="70px" src={money} alt="cash group" />
            <h1>Cash Group</h1>
          </div>
          <div className="splash_content">{Logintoggled ? <CreateAccount /> : <Login />}</div>
        </div>
      </div>
    </div>
  );
}

export default SpashScreen;
