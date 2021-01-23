import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
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
          <Switch>
            <div className="app">
              <Header />
              <div className="app_body">
                <Route path="/" exact component={Home} />
              </div>
              <Footer />
            </div>
          </Switch>
        </Router>
      </Provider>
    </UserProvider>
  );
}

export default App;
