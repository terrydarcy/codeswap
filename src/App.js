import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import BalancePage from "./pages/BalancePage";
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";
import AddTask from "./pages/AddTask";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import Footer from "./components/Footer";
import { createStore } from "redux";
import songDataReducers from "./redux/reducers";
import { Provider } from "react-redux";

function App() {
  const store = createStore(songDataReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return (
    <UserProvider>
      <Provider store={store}>
        <Router>
          <Header />
          <div className="app">
            <div className="app_body">
              <div className="header_margin_correction">
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/createaccount" component={CreateAccount} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/balance" component={BalancePage} />
                  <Route path="/addJob" component={AddTask} />
                  <Route path="/" exact component={Home} />
                </Switch>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    </UserProvider>
  );
}

export default App;
